import { Router } from 'express';
import { del, get, post, put } from '../controllers/controllerProductos.js';
const router = Router();

router.get('/:id?', get);
router.post('/', post);
router.put('/:id', put);
router.delete('/:id', del);

export default router ;