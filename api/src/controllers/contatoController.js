import { pool } from '../config/database.js';

export async function enviarMensagem(req, res) {
  try {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos.',
      });
    }

    await pool.query(
      `INSERT INTO mensagens (nome, email, assunto, mensagem)
       VALUES (?, ?, ?, ?)`,
      [nome, email, assunto, mensagem]
    );

    res.status(201).json({
      mensagem: 'Mensagem enviada com sucesso!',
    });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao enviar mensagem.' });
  }
}

export async function listarMensagens(req, res) {
  try {
    const [mensagens] = await pool.query(
      'SELECT * FROM mensagens ORDER BY id DESC'
    );

    res.json(mensagens);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar mensagens.' });
  }
}

export async function excluirMensagem(req, res) {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM mensagens WHERE id = ?', [id]);

    res.json({ mensagem: 'Mensagem excluída.' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao excluir mensagem.' });
  }
}