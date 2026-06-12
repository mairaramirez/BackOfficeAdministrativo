// src/modules/turnos/turnos.repository.js
import { TurnoModel } from './turnos.model.js';

export const findAll = async () => {
  return await TurnoModel.find();
};

export const findById = async (id) => {
  return await TurnoModel.findById(id);
};

export const findByClientNumber = async (clientNumber) => {
  return await TurnoModel.find({ clientNumber });
};

export const create = async (data) => {
  return await TurnoModel.create(data);
};

export const update = async (id, payload) => {
  return await TurnoModel.findByIdAndUpdate(id, payload, { new: true });
};

export const remove = async (id) => {
  return await TurnoModel.findByIdAndDelete(id);
};

export const findByTurnoNumber = (turnoNumber) =>
  TurnoModel.findOne({ turnoNumber });

export const findConfirmadoBySlot = async (fecha, hora) => {
  return await TurnoModel.findOne({
    fecha,
    hora,
    status: 'confirmado'
  });
};
export const updateByTurnoNumber = async (turnoNumber, payload) => {
  return await TurnoModel.findOneAndUpdate(
    { turnoNumber },
    payload,
    { new: true }
  );
};
