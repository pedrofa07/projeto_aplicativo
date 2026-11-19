
import express from 'express';

import {
  cadastrarUsuario,
  loginUsuario,
  obterUsuarioAutenticado,
} from '../controllers/usuarioController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);

router.post('/login', loginUsuario);

router.get('/me', authMiddleware, obterUsuarioAutenticado);

export default router;
