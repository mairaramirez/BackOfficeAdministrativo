
import { Router } from 'express';
import * as turnosController from './turnos.controller.js';
import { validateBody } from '../middleware/validate.js';
import { createTurnoSchema } from './turnos.schema.js';

const router = Router();

router.get('/', turnosController.getAll);
router.get('/cliente/:clientNumber', turnosController.getByClient);
router.post('/', validateBody(createTurnoSchema), turnosController.create);
router.patch('/numero/:numero/confirmar', turnosController.confirmar)
router.patch('/numero/:numero/cancelar', turnosController.cancelar);
router.patch('/numero/:turnoNumber', turnosController.actualizarFechaHora);



export default router;


