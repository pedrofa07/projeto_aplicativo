import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos.',
      });
    }

    const [usuariosExistentes] = await pool.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
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
      [nome, email, senhaCriptografada]
    );

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: {
        id: resultado.insertId,
        nome,
        email,
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

    const identificador = login || email;

    if (!identificador || !senha) {
      return res.status(400).json({
        mensagem: 'Informe o login e a senha.',
      });
    }

    // Login fixo do administrador
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

      const token = jwt.sign(
        {
          id: usuarioAdmin.id,
          email: usuarioAdmin.email,
          nivel: usuarioAdmin.nivel,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '8h',
        }
      );

      return res.json({
        mensagem: 'Login de administrador realizado com sucesso.',
        token,
        usuario: usuarioAdmin,
      });
    }

    // Login de usuário comum
    const [usuarios] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [identificador]
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

    const token = jwt.sign(
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

    return res.json({
      mensagem: 'Login realizado com sucesso.',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel,
      },
    });
  } catch (erro) {
    console.error('Erro ao realizar login:', erro);

    return res.status(500).json({
      mensagem: 'Erro ao realizar login.',
    });
  }
}