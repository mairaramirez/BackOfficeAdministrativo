import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema(
  {
    clientNumber: {
      type: Number,
      required: true,
      index: true,
    },
    turnoNumber: {
      type: Number,
      required: true,
      unique: true
    },
    oficio: {
      type: String,
      required: true
    },
    fecha: {
      type: Date,
      required: true,
      index: true,
    },
    hora: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pendiente', 'confirmado', 'cancelado'],
      default: 'pendiente'
    },
    notas: String
  },
);

export const TurnoModel = mongoose.model('Turno', turnoSchema);
