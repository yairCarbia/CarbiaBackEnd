import { Router } from 'express';
import { addProd, deleteAll, deleteOne, getAll, getOne, updateProd } from '../controllers/prods.controllers.js';

const router = Router()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', addProd)
router.put('/:id', updateProd)
router.delete('/:id', deleteOne)
router.delete('/', deleteAll)

export default router;