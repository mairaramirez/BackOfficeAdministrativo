// src/modules/users/users.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clientNumber: {
      type: Number,
      unique: true,
      index: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    nacimiento: {
      type: Date,
    },
    apellido: {
      type: String
    },
    documento: {
      type: String
    },
    telefono: {
      type: String
    },
    movil: {
      type: String
    },
    email: {
      type: String,
      required: true,
    },
    direccion: {
      type: String
    },
    cp: {
      type: String
    },
    localidad: {
      type: String
    },
    provincia: {
      type: String
    },
    fecha: {
      type: Date,
    },



    // ==========================
    // NUEVO 
    // ==========================

    fuente: {
      type: String,
      enum: ['service-home', 'myr'],
      index: true,
    },

    promotor: {
      type: String,
    },

    contrato: {
      type: String,
    },
  }
);


export const UserModel = mongoose.model('User', userSchema);
