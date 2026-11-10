
import { pool } from '../config/database.js';

export async function listarEmpresas(req, res) {
  try {
    const [empresas] = await pool.query(
      `SELECT id, nome, endereco, bairro, telefone, email, instagram
       FROM empresas
       WHERE aprovado = 1
       ORDER BY nome`
    );

    return res.json(empresas);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      mensagem: 'Erro ao listar empresas.',
    });
  }
}

export async function cadastrarEmpresa(req, res) {
  try {
    const {
      nome,
      endereco,
      bairro,
      telefone,
      email,
      instagram,
      cnpj,
    } = req.body;

    const cnpjNumeros = String(cnpj || '').replace(/\D/g, '');

    if (
      !nome?.trim() ||
      !endereco?.trim() ||
      !bairro?.trim() ||
      !telefone?.trim() ||
      !email?.trim() ||
      !cnpjNumeros
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos obrigatórios, incluindo o CNPJ.',
      });
    }

    if (cnpjNumeros.length !== 14) {
      return res.status(400).json({
        mensagem: 'O CNPJ deve possuir 14 números.',
      });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValido) {
      return res.status(400).json({
        mensagem: 'Informe um e-mail válido.',
      });
    }

    await pool.query(
      `INSERT INTO empresas
       (nome, endereco, bairro, telefone, email, instagram, cnpj, aprovado)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        nome.trim(),
        endereco.trim(),
        bairro.trim(),
        telefone.trim(),
        email.trim(),
        instagram?.trim() || null,
        cnpjNumeros,
      ]
    );

    return res.status(201).json({
      mensagem: 'Empresa cadastrada! Aguarde a aprovação do administrador.',
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao cadastrar empresa.',
    });
  }
}

export async function listarTodasEmpresas(req, res) {
  try {
    const [empresas] = await pool.query(
      'SELECT * FROM empresas ORDER BY id DESC'
    );

    return res.json(empresas);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao listar empresas.',
    });
  }
}

export async function atualizarAprovacao(req, res) {
  try {
    const { id } = req.params;
    const { aprovado } = req.body;

    if (typeof aprovado !== 'boolean') {
      return res.status(400).json({
        mensagem: 'Informe uma situação de aprovação válida.',
      });
    }

    const [resultado] = await pool.query(
      'UPDATE empresas SET aprovado = ? WHERE id = ?',
      [aprovado ? 1 : 0, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Empresa não encontrada.',
      });
    }

    return res.json({
      mensagem: 'Situação da empresa atualizada.',
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao atualizar empresa.',
    });
  }
}

export async function editarEmpresa(req, res) {
  try {
    const { id } = req.params;

    const {
      nome,
      endereco,
      bairro,
      telefone,
      email,
      instagram,
      cnpj,
    } = req.body;

    const cnpjNumeros = String(cnpj || '').replace(/\D/g, '');

    if (
      !nome?.trim() ||
      !endereco?.trim() ||
      !bairro?.trim() ||
      !telefone?.trim() ||
      !email?.trim() ||
      cnpjNumeros.length !== 14
    ) {
      return res.status(400).json({
        mensagem: 'Preencha os campos obrigatórios e informe um CNPJ com 14 números.',
      });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValido) {
      return res.status(400).json({
        mensagem: 'Informe um e-mail válido.',
      });
    }

    const [resultado] = await pool.query(
      `UPDATE empresas
       SET nome = ?,
           endereco = ?,
           bairro = ?,
           telefone = ?,
           email = ?,
           instagram = ?,
           cnpj = ?
       WHERE id = ?`,
      [
        nome.trim(),
        endereco.trim(),
        bairro.trim(),
        telefone.trim(),
        email.trim(),
        instagram?.trim() || null,
        cnpjNumeros,
        id,
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Empresa não encontrada.',
      });
    }

    return res.json({
      mensagem: 'Informações da empresa atualizadas com sucesso.',
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao editar empresa.',
    });
  }
}

export async function excluirEmpresa(req, res) {
  try {
    const { id } = req.params;

    const [resultado] = await pool.query(
      'DELETE FROM empresas WHERE id = ?',
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Empresa não encontrada.',
      });
    }

    return res.json({
      mensagem: 'Empresa excluída.',
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao excluir empresa.',
    });
  }
}
