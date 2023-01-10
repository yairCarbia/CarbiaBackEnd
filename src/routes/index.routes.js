import {Router} from 'express' 
import prodsRoute from './prods.routes.js'

const router = Router()

router.use('/prods', prodsRoute)

export default router;