//👉 Definición de la API

// src/app.js
import express from 'express';
import cors from 'cors'
import usersRoutes from './modules/users/users.routes.js';
import turnosRoutes from './modules/turnos/turnos.routes.js';


const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/users', usersRoutes);
app.use('/turnos', turnosRoutes);


export default app;
