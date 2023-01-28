import { Application, config } from './deps.ts';
import { logger } from './logger/logger.ts';
import { routerColor } from './routes/index.routes.ts';

const configData = await config();
const PORT = configData['PORT'] || 4000;

const app = new Application();

app.use(logger);
app.use(routerColor.routes());

console.log(`Escuchando en el puerto ${PORT}`);

await app.listen({ port: Number(PORT) });
