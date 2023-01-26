import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('layouts/home.hbs');
});

export default router;
