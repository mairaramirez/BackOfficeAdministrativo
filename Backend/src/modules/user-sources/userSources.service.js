// src/modules/user-sources/userSources.service.js
import * as repo from './userSources.repository.js';

export const registerSource = async ({
  userId,
  fuente,
  promotor,
  contrato,
}) => {
  return repo.create({
    userId,
    fuente,
    promotor,
    contrato,
  });
};
