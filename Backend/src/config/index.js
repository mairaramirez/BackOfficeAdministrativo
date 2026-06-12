//👉 Fuente única de verdad

// src/config/index.js
import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 8080,

  // Persistencia
  PERSISTENCE: 'MONGO',

  // Mongo local
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME || 'backoffice',
};

// Validación básica (fail fast)
if (!config.MONGO_URI) {
  throw new Error('❌ MONGO_URI no definida');
}

export default config;
