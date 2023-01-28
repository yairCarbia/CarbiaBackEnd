import type { Context } from '../deps.ts';

export const logger = async (ctx: Context, next: () => void) => {
  console.log(`${ctx.request.method} request to ${ctx.request.url}`);
  await next();
};
