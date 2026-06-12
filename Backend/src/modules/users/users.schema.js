import Joi from 'joi';

export const createUserSchema = Joi.object({
  // 🔴 requeridos reales
  nombre: Joi.string().min(2).required(),
  apellido: Joi.string().required(),
  documento: Joi.string().pattern(/^\d+$/).required(),
  email: Joi.string().email().required(),

  // 🟡 básicos opcionales
  telefono: Joi.string().optional(),
  direccion: Joi.string().optional(),

  // 🟢 datos de formulario (NO obligatorios hoy)
  fecha: Joi.date().iso().optional(),
  contrato: Joi.string().optional(),
  promotor: Joi.string().optional(),
  nacimiento: Joi.date().iso().optional(),

  cp: Joi.string().optional(),
  localidad: Joi.string().optional(),
  provincia: Joi.string().optional(),

  prefijo: Joi.string().optional(),
  movil: Joi.string().optional(),

  fuente: Joi.string().valid('service-home', 'myr').optional(),
})
.options({ stripUnknown: false }); // 👈 CLAVE


export const updateUserSchema = Joi.object({
  nombre: Joi.string().min(2).optional(),
  apellido: Joi.string().optional(),
  documento: Joi.string().pattern(/^\d+$/).optional(),
  email: Joi.string().email().optional(),

  telefono: Joi.string().optional(),
  direccion: Joi.string().optional(),

  fecha: Joi.date().iso().optional(),
  contrato: Joi.string().optional(),
  promotor: Joi.string().optional(),
  nacimiento: Joi.date().iso().optional(),

  cp: Joi.string().optional(),
  localidad: Joi.string().optional(),
  provincia: Joi.string().optional(),

  prefijo: Joi.string().optional(),
  movil: Joi.string().optional(),

  fuente: Joi.string().valid('service-home', 'myr').optional(),
})
.options({ stripUnknown: false });

