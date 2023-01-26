import { loggerError, loggerWarn } from '../config/log4.js';

const errorHandler = (error, ctx) => {
  const notFoundedErrors = [
    /* -------------------- Errores relacionados a productos -------------------- */
    'Error al insertar: uno o más campos quedaron vacíos.',
    'Error al listar: no se encontró el producto con el id indicado.',
    'Error al listar: no hay productos cargados en el sistema.',
    'Error al actualizar: uno o más campos quedaron vacíos.',
    'Error al actualizar: no se encontró el producto con el id indicado.',
    'Error al borrar: no se encontró el producto con el id indicado.',
  ];
  if (notFoundedErrors.includes(error)) {
    ctx.status = 404;
    loggerWarn.warn(error);
  } else {
    ctx.status = 500;
    loggerError.error(error);
  }
  return (ctx.body = { status: ctx.status, error });
};

export default errorHandler;
