// src/modules/user-sources/userSources.repository.js
import { UserSourceModel } from './userSources.model.js';

export const create = async (data) => {
  return UserSourceModel.create(data);
};

export const findByUserId = async (userId) => {
  return UserSourceModel.find({ userId });
};
