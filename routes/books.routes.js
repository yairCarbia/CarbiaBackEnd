import Router from 'koa-routes'
import * as booksControllers from '../controller/books.controller.js'

const router = Router({
  prefix: '/books'
})

router.get('/', booksControllers.getAll)
router.get('/:id', booksControllers.getOne)
router.post('/', booksControllers.addOne)
router.put('/:id', booksControllers.putOne)
router.delete('/:id', booksControllers.deleteOne)

export default router