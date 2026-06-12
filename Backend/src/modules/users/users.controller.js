// manejan HTTP  src/modules/users/users.controller.js
import * as usersService from './users.service.js';

/* GET /users */
export const getAll = async (req, res) => {
  const users = await usersService.getAllUsers();
  res.json(users);
};

/* GET /users/:id */
export const getById = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(user);
};

/* POST /users */
export const create = async (req, res) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* PUT /users/:id */
export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await usersService.updateUser(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* DELETE /users/:id */
export const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await usersService.deleteUser(id);
  res.json({ message: 'Usuario eliminado' });
  if (!deleted) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.status(204).send();
};

export const search = async (req, res) => {
  try {
    const { q } = req.query;
    const users = await usersService.searchClients(q);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};