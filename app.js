import Koa from 'koa';
import { koaBody } from 'koa-body';
import serve from 'koa-static';
import hbs from 'koa-views-handlebars';
import path from 'path';
import requestsLogger from './src/middlewares/reqLogger.middleware.js';
import notFoundMiddleware from './src/middlewares/notFound.middleware.js';

/* ---------------------------- routes importing ---------------------------- */
import homeRouter from './src/routes/home.routes.js';
import apiRouter from './src/routes/api/index.routes.js';
import infoRouter from './src/routes/info.routes.js';

const app = new Koa();

/* -------------------------- template engine settings -------------------------- */
app.use(
  hbs(path.join(process.cwd(), '/src/views/'), {
    layoutsDir: path.join(process.cwd(), '/src/views/layouts'),
    // partialDirs: path.join(process.cwd(), '/src/views/partials'),
    debug: false,
  })
);

/* -------------------------- middlewares settings -------------------------- */
app.use(serve(path.join(process.cwd(), '/public')));
app.use(koaBody());
app.use(requestsLogger);

/* -------------------------- routes settings -------------------------- */
app.use(homeRouter.routes());
app.use(infoRouter.routes());
app.use(apiRouter.routes());

/* --------------------------- 404 route not found -------------------------- */
app.use(notFoundMiddleware);

export default app;
