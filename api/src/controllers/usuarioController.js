
import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function gerarToken(usuario) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não configurado.');
  }

  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      nivel: usuario.nivel,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h',
    }
  );
}

export async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (
      !nome?.trim() ||
      !email?.trim() ||
      !senha
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos.',
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
      return res.status(400).json({
        mensagem: 'Informe um e-mail válido.',
      });
    }

    if (senha.length < 8) {
      return res.status(400).json({
        mensagem: 'A senha deve possuir pelo menos 8 caracteres.',
      });
    }

    const [usuariosExistentes] = await pool.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [emailNormalizado]
    );

    if (usuariosExistentes.length > 0) {
      return res.status(409).json({
        mensagem: 'Este e-mail já está cadastrado.',
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const [resultado] = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, nivel)
       VALUES (?, ?, ?, 'usuario')`,
      [
        nome.trim(),
        emailNormalizado,
        senhaCriptografada,
      ]
    );

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: {
        id: resultado.insertId,
        nome: nome.trim(),
        email: emailNormalizado,
        nivel: 'usuario',
      },
    });
  } catch (erro) {
    console.error('Erro ao cadastrar usuário:', erro);

    return res.status(500).json({
      mensagem: 'Erro ao cadastrar usuário.',
    });
  }
}

export async function loginUsuario(req, res) {
  try {
    const { email, login, senha } = req.body;

    const identificador = (login || email || '').trim();

    if (!identificador || !senha) {
      return res.status(400).json({
        mensagem: 'Informe o login e a senha.',
      });
    }

    // Login administrativo
    if (
      identificador === process.env.ADMIN_LOGIN &&
      senha === process.env.ADMIN_PASSWORD
    ) {
      const usuarioAdmin = {
        id: 'admin',
        nome: 'Administrador',
        email: process.env.ADMIN_LOGIN,
        nivel: 'admin',
      };

      const token = gerarToken(usuarioAdmin);

      return res.json({
        mensagem: 'Login de administrador realizado com sucesso.',
        token,
        usuario: usuarioAdmin,
      });
    }

    // Login de usuário comum
    const emailNormalizado = identificador.toLowerCase();

    const [usuarios] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [emailNormalizado]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensagem: 'Login ou senha inválidos.',
      });
    }

    const usuario = usuarios[0];

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: 'Login ou senha inválidos.',
      });
    }

    const usuarioResposta = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      nivel: usuario.nivel,
    };

    const token = gerarToken(usuarioResposta);

    return res.json({
      mensagem: 'Login realizado com sucesso.',
      token,
      usuario: usuarioResposta,
    });
  } catch (erro) {
    console.error('Erro ao realizar login:', erro);

    return res.status(500).json({
      mensagem: 'Erro ao realizar login.',
    });
  }
}

export async function obterUsuarioAutenticado(req, res) {
  try {
    if (req.usuario.nivel === 'admin') {
      return res.json({
        usuario: {
          id: 'admin',
          nome: 'Administrador',
          email: req.usuario.email,
          nivel: 'admin',
        },
      });
    }

    const [usuarios] = await pool.query(
      `SELECT id, nome, email, nivel
       FROM usuarios
       WHERE id = ?`,
      [req.usuario.id]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensagem: 'Usuário não encontrado.',
      });
    }

    return res.json({
      usuario: usuarios[0],
    });
  } catch (erro) {
    console.error('Erro ao recuperar usuário:', erro);

    return res.status(500).json({
      mensagem: 'Erro ao recuperar os dados do usuário.',
    });
  }
}
