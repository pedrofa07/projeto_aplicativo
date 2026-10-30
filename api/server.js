import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usuarioRoutes from './src/routes/usuarioRoutes.js';
import empresaRoutes from './src/routes/empresaRoutes.js';
import contatoRoutes from './src/routes/contatoRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API BrightEnergy funcionando!' });
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/contato', contatoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});