// turnos.service.js
import * as repo from './turnos.repository.js';
import { getNextSequence } from '../counters/counters.repository.js';
import { UserModel } from '../users/users.model.js';
import { TurnoModel } from './turnos.model.js';

export const getAllTurnos = async () => {
  const turnos = await repo.findAll();

  const clientNumbers = turnos.map(t => t.clientNumber);

  const users = await UserModel.find({
    clientNumber: { $in: clientNumbers }
  }).lean();

  const usersMap = {};
  users.forEach(u => {
    usersMap[u.clientNumber] = u;
  });

  return turnos.map(t => ({
    ...t.toObject(),
    cliente: usersMap[t.clientNumber] || null
  }));
};


export const createTurno = async (data) => {
  if (!data.clientNumber || !data.oficio || !data.fecha || !data.hora) {
    throw new Error('Datos incompletos para crear turno');
  }

  const user = await UserModel.findOne({ clientNumber: data.clientNumber });
  if (!user) {
    throw new Error('Cliente no existe');
  }

  const fecha = new Date(data.fecha);
  fecha.setUTCHours(0, 0, 0, 0);

  const existe = await repo.findConfirmadoBySlot(fecha, data.hora);
  if (existe) {
    throw new Error('Ya existe un turno para esa fecha y hora');
  }

  const turnoNumber = await getNextSequence('turnos');

  return repo.create({
    turnoNumber,
    clientNumber: data.clientNumber,
    oficio: data.oficio,
    fecha,
    hora: data.hora,
    notas: data.notas,
  });
};

export const confirmarTurno = async (turnoNumber) => {
  const turno = await repo.findByTurnoNumber(turnoNumber);

  if (!turno) {
    throw new Error('Turno no existe');
  }

  if (turno.status === 'cancelado') {
    throw new Error('No se puede confirmar un turno cancelado');
  }

  const ocupado = await repo.findConfirmadoBySlot(
    turno.fecha,
    turno.hora
  );

  if (ocupado) {
    throw new Error(
      'Ya existe un turno confirmado para esa fecha y hora'
    );
  }

  turno.status = 'confirmado';
  await turno.save();

  return turno;
};

export const cancelarTurno = async (turnoNumber) => {
  const turno = await repo.findByTurnoNumber(turnoNumber);

  if (!turno) {
    throw new Error('Turno no existe');
  }

  if (turno.status === 'cancelado') {
    throw new Error('El turno ya está cancelado');
  }

  turno.status = 'cancelado';
  await turno.save();

  return turno;
};


export const getTurnosByClient = async (clientNumber) => {
  const user = await UserModel.findOne({ clientNumber });
  if (!user) {
    throw new Error('Cliente no existe');
  }
  const turnos = await repo.findByClientNumber(clientNumber);
  return turnos;
};

export const actualizarFechaHora = async (turnoNumber, fecha, hora) => {
  return repo.updateByTurnoNumber(turnoNumber, { fecha, hora });
};



