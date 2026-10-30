import express from 'express';

import {
  enviarMensagem,
  listarMensagens,
  excluirMensagem,
} from '../controllers/contatoController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.post('/', enviarMensagem);

router.get('/admin', authMiddleware, adminMiddleware, listarMensagens);
router.delete('/:id', authMiddleware, adminMiddleware, excluirMensagem);

export default router;