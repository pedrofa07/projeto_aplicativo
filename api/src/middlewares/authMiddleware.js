import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const cabecalho = req.headers.authorization;

  if (!cabecalho || !cabecalho.startsWith('Bearer ')) {
    return res.status(401).json({
      mensagem: 'Token não informado.',
    });
  }

  const token = cabecalho.slice(7);

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = usuario;

    next();
  } catch (erro) {
    return res.status(401).json({
      mensagem: 'Token inválido ou expirado.',
    });
  }
}