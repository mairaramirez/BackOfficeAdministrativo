//👉 Orquestador

// src/server.js
import 'dotenv/config';
import app from './app.js';
import config from './config/index.js';
import { connectDB } from './config/db.js';

async function start() {
  await connectDB();

  app.listen(config.PORT, () => {
    console.log(`🚀 Backend en http://localhost:${config.PORT}`);
  });
}

start();
