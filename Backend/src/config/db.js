//👉 Adaptador de infraestructura

// src/config/db.js
import mongoose from 'mongoose';
import config from './index.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI, {
      dbName: config.DB_NAME,
    });

    console.log('✅ MongoDB conectado (LOCAL)');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    throw error;
  }
}
