export default async (ctx) => {
  ctx.status = 404;
  return (ctx.body = '<h1>ERROR 404 - RUTA NO ENCONTRADA</h1>');
};