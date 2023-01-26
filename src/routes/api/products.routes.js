import Router from 'koa-router';
import productsController from '../../controllers/api/products.controller.js';

const router = new Router({
  prefix: '/products',
});

/* ----------------------------- Products router ---------------------------- */
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.addProduct);
router.put('/:id', productsController.updateProductById);
router.delete('/:id', productsController.deleteProductById);

export default router;
