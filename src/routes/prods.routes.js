import {Router} from 'express' 
import { addOne, deleteAll, deleteOne, getAll, getOne, putProd } from '../controllers/prods.controller.js'

const router = Router()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', addOne)
router.put('/:id', putProd)
router.delete('/:id', deleteOne)
router.delete('/', deleteAll)

export default router;