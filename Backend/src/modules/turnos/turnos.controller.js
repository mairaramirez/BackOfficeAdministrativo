// manejan HTTP

// src/modules/turnos/turnos.controller.js

import * as turnosService from './turnos.service.js';

export const getAll = async (req, res) => {
  try {
    const turnos = await turnosService.getAllTurnos();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({
      message: 'Error obteniendo turnos',
      error: error.message
    });
  }
};

export const create = async (req, res) => {
  try {
    const turno = await turnosService.createTurno(req.body);
    res.status(201).json(turno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const confirmar = async (req, res) => {
  try {
    const { numero } = req.params; // ✅ CLAVE
    const turno = await turnosService.confirmarTurno(
      Number(numero)
    );
    res.json(turno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const cancelar = async (req, res) => {
  try {
    const { numero } = req.params; 

    const turno = await turnosService.cancelarTurno(
      Number(numero)
    );

    res.json(turno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getByClient = async (req, res) => {
  try {
    const { clientNumber } = req.params;

    const turnos = await turnosService.getTurnosByClient(clientNumber);

    res.json(turnos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const actualizarFechaHora = async (req, res) => {
  try {
    const { turnoNumber } = req.params;
    const { fecha, hora } = req.body;

    const turno = await turnosService.actualizarFechaHora(
      turnoNumber,
      fecha,
      hora
    );

    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    res.json(turno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error actualizando turno" });
  }
};

