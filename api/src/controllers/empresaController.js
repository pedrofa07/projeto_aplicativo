import { pool } from '../config/database.js';

export async function listarEmpresas(req, res) {
  try {
    const [empresas] = await pool.query(
      `SELECT id, nome, endereco, bairro, telefone, email, instagram
       FROM empresas
       WHERE aprovado = 1
       ORDER BY nome`
    );

    res.json(empresas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
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

    if (!nome || !endereco || !bairro || !telefone || !email) {
      return res.status(400).json({
        mensagem: 'Preencha os campos obrigatórios.',
      });
    }

    await pool.query(
      `INSERT INTO empresas
       (nome, endereco, bairro, telefone, email, instagram, cnpj, aprovado)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        nome,
        endereco,
        bairro,
        telefone,
        email,
        instagram || null,
        cnpj || null,
      ]
    );

    res.status(201).json({
      mensagem: 'Empresa cadastrada! Aguarde a aprovação do administrador.',
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: 'Erro ao cadastrar empresa.',
    });
  }
}

export async function listarTodasEmpresas(req, res) {
  try {
    const [empresas] = await pool.query(
      `SELECT * FROM empresas ORDER BY id DESC`
    );

    res.json(empresas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: 'Erro ao listar empresas.',
    });
  }
}

export async function atualizarAprovacao(req, res) {
  try {
    const { id } = req.params;
    const { aprovado } = req.body;

    const [resultado] = await pool.query(
      'UPDATE empresas SET aprovado = ? WHERE id = ?',
      [aprovado ? 1 : 0, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Empresa não encontrada.',
      });
    }

    res.json({
      mensagem: 'Situação da empresa atualizada.',
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
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

    if (
      !nome?.trim() ||
      !endereco?.trim() ||
      !bairro?.trim() ||
      !telefone?.trim() ||
      !email?.trim() ||
      !cnpj?.trim()
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos obrigatórios.',
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
        cnpj.trim(),
        id,
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Empresa não encontrada.',
      });
    }

    res.json({
      mensagem: 'Informações da empresa atualizadas com sucesso.',
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
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

    res.json({
      mensagem: 'Empresa excluída.',
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: 'Erro ao excluir empresa.',
    });
  }
}