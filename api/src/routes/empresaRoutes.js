import express from 'express';

import {
  listarEmpresas,
  cadastrarEmpresa,
  listarTodasEmpresas,
  atualizarAprovacao,
  excluirEmpresa,
} from '../controllers/empresaController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', listarEmpresas);
router.post('/', cadastrarEmpresa);

router.get('/admin/todas', authMiddleware, adminMiddleware, listarTodasEmpresas);
router.put('/:id/aprovacao', authMiddleware, adminMiddleware, atualizarAprovacao);
router.delete('/:id', authMiddleware, adminMiddleware, excluirEmpresa);

export default router;