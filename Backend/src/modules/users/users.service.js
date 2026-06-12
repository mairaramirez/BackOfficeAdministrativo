// acceso a datos (Acá está el “cerebro”) contienen la lógica de negocio

// users.service.js
import { getNextSequence } from '../counters/counters.repository.js';
import { UserModel } from './users.model.js';

export const getAllUsers = async () => {
  return await UserModel.find().lean();
};

export const getUserById = async (id) => {
  return await UserModel.findById(id);
};

export const createUser = async (data) => {
  const clientNumber = await getNextSequence('users');

  const user = await UserModel.create({
    clientNumber,
    ...data
    
  });

  return user;
};

export const updateUser = async (id, payload) => {
  return await UserModel.findByIdAndUpdate(
    id,
    payload,
    { new: true }
  );
};

export const deleteUser = async (id) => {
  return await UserModel.findOneAndDelete(id);
};

import * as repo from './users.repository.js';

export const searchClients = async (query) => {
  if (!query) return [];
  return repo.searchByClientNumber(query);
};