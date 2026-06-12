// src/services/users.service.js
import { usersApi } from '@/api/usersApi.js';

export async function createUser(data) {
  return usersApi.create(data);
}

export async function searchClients(query) {
  return usersApi.search(query);
}
