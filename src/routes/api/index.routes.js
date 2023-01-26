import Router from 'koa-router';
import productsRouter from './products.routes.js'
import fakerRouter from './fakeProducts.routes.js';

const router = new Router({
  prefix: '/api',
});

//Obtiene todas las subrutas de los diferentes ficheros y las engloba en router.
router.use(productsRouter.routes());
router.use(fakerRouter.routes());

export default router;
