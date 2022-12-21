import { Router } from 'express';
import prodsRoute from './prods.js' 

const router = Router()

router.use('/api/prods', prodsRoute)

export default router;