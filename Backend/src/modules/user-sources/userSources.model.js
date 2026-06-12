// src/modules/user-sources/userSources.model.js
import mongoose from 'mongoose';

const userSourceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    fuente: {
      type: String,
      enum: ['SERVICE_HOME', 'MYR'],
      required: true,
      index: true,
    },

    promotor: String,
    contrato: String,
  },
  {
    timestamps: true,
  }
);

export const UserSourceModel = mongoose.model(
  'UserSource',
  userSourceSchema
);
