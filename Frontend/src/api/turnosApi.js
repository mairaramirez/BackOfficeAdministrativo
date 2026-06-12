import { http } from './http.js';

export const turnosApi = {
  list: () => http('/turnos'),

  create: (data) =>
    http('/turnos', { method: 'POST', body: data }),

  confirmar: (turnoNumber) =>
    http(`/turnos/numero/${turnoNumber}/confirmar`, {
      method: 'PATCH'
    }),

  cancelar: (turnoNumber) =>
    http(`/turnos/numero/${turnoNumber}/cancelar`, {
      method: 'PATCH'
    }),

   update: (turnoNumber, data) =>
    http(`/turnos/numero/${turnoNumber}`, {
      method: 'PATCH',
      body: data
    }),


};


