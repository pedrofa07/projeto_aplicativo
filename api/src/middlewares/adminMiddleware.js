export function adminMiddleware(req, res, next) {
  if (!req.usuario || req.usuario.nivel !== 'admin') {
    return res.status(403).json({
      mensagem: 'Acesso permitido somente ao administrador.',
    });
  }

  next();
}