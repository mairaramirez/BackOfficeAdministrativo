// src/api/usersApi.js
import { http } from './http.js';

export const usersApi = {
  list: () => http('/users'),
  create: (data) => http('/users', { method: 'POST', body: data }),
  update: (id, data) => http(`/users/${id}`, { method: 'PUT', body: data }),
  remove: (id) => http(`/users/${id}`, { method: 'DELETE' }),
  search: (q) => http(`/users/search?q=${q}`)
};

