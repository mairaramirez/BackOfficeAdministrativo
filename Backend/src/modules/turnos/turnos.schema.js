import Joi from 'joi';

export const createTurnoSchema = Joi.object({
  clientNumber: Joi.number().required(),
  oficio: Joi.string().required(),
  fecha: Joi.string().required(), // yyyy-mm-dd
  hora: Joi.string().required(),  // "09:30"
  notas: Joi.string().optional(),
});
export const updateTurnoSchema = Joi.object({
  fecha: Joi.string().required(),
  hora: Joi.string().required()
});


