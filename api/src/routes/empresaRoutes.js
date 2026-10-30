import express from 'express';

import {
  listarEmpresas,
  cadastrarEmpresa,
  listarTodasEmpresas,
  atualizarAprovacao,
  editarEmpresa,
  excluirEmpresa,
} from '../controllers/empresaController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Rotas públicas
router.get('/', listarEmpresas);
router.post('/', cadastrarEmpresa);

// Rotas exclusivas do administrador
router.get(
  '/admin/todas',
  authMiddleware,
  adminMiddleware,
  listarTodasEmpresas
);

router.put(
  '/:id/aprovacao',
  authMiddleware,
  adminMiddleware,
  atualizarAprovacao
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  editarEmpresa
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  excluirEmpresa
);

export default router;