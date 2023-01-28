import { Router } from '../deps.ts';
import { createColor, getColors } from '../handlers/color.handler.ts';

export const routerColor = new Router();

routerColor
  .get('/colors', getColors)
  .post('/colors', createColor);
