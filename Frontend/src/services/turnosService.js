// src/services/turnosService.js
import { turnosApi } from '@/api/turnosApi';

export async function listTurnos() {
  return turnosApi.list();
}

export async function createTurno(data) {
  return turnosApi.create(data);
}

export async function confirmarTurno(turnoNumber) {
  return turnosApi.confirmar(turnoNumber);
}

export async function cancelarTurno(turnoNumber) {
  return turnosApi.cancelar(turnoNumber);
}
