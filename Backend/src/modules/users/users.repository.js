// Manejan la persistencia
import fs from 'fs/promises';
import path from 'path';
import { UserModel } from './users.model.js';

const USERS_FILE = path.resolve('src/storage/users.json');

async function readFile() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    if (!data.trim()) return [];
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export const findAll = async () => {
  return await UserModel.find().lean();
};

export const findById = async (id) => {
  return await UserModel.findById(id).lean();
};


export async function findByDocumento(documento) {
  const users = await readFile();
  return users.find(u => u.documento === documento);
}


export const create = async (data) => {
  const user = await UserModel.create(data);
  return user;
};


export const update = async (id, payload) => {
  return await UserModel.findByIdAndUpdate(
    id,
    payload,
    { new: true }
  );
};

export const remove = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

export const searchByClientNumber = async (query) => {
  return UserModel.find({
    $expr: {
      $regexMatch: {
        input: { $toString: "$clientNumber" },
        regex: `^${query}`
      }
    }
  })
  .select('clientNumber nombre')
  .limit(10)
  .lean();
};

