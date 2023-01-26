import Router from 'koa-router';
import ProductFakerMock from '../../utils/mocks/productFakerMock.js';

const router = new Router({
  prefix: '/fake-products',
});

router.get('/', async (ctx) => {
  const fakeProducts = new ProductFakerMock();
  const products = fakeProducts.populateProducts(5);
  await ctx.render('layouts/viewFakeProducts', {
    products,
    existProducts: products.length,
  });
});

export default router;
