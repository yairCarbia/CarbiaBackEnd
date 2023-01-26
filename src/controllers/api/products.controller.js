import DAOFactory from '../../persistency/DAO/DAOFactory.js';
import { PERSISTENCY } from '../../config/index.js';
import { loggerError } from '../../config/log4.js';
import areFieldsFilled from '../../utils/areFieldsFilled.js';
import errorHandler from '../../middlewares/errorHandler.middleware.js'


let productDAO;
(async () => {
  try {
    productDAO = await DAOFactory.getPersistency('products', PERSISTENCY);
    return productDAO;
  } catch (error) {
    loggerError.error(error);
    throw `${error}`;
  }
})();

const productsController = {
  getAllProducts: async (ctx) => {
    try {
      ctx.body = await productDAO.readProducts();
    } catch (error) {
      errorHandler(error, ctx);
    }
  },
  getProductById: async (ctx) => {
    const { id } = ctx.params;
    try {
      ctx.body = await productDAO.readProductById(id);
    } catch (error) {
      errorHandler(error, ctx);
    }
  },
  addProduct: async (ctx) => {
    if (areFieldsFilled(ctx.request.body)) {
      const { title, thumbnail, price } = ctx.request.body;
      // Si no quedó ningún campo vacío, se procede a ingresar el producto
      try {
        ctx.body = await productDAO.insertProduct({
          title,
          price: parseFloat(price),
          thumbnail,
        });
      } catch (error) {
        errorHandler(error, ctx);
      }
    } else {
      errorHandler('Error al insertar: uno o más campos quedaron vacíos.', ctx);
    }
  },
  updateProductById: async (ctx) => {
    if (areFieldsFilled(ctx.request.body)) {
      const { id } = ctx.params;
      const { title, thumbnail, price } = ctx.request.body;
      // Si no quedó ningún campo vacío, se procede a actualizar el producto
      try {
        ctx.body = await productDAO.updateProduct(
          { id },
          {
            title,
            price: parseFloat(price),
            thumbnail,
          }
        );
      } catch (error) {
        errorHandler(error, ctx);
      }
    } else {
      errorHandler('Error al actualizar: uno o más campos quedaron vacíos.', ctx);
    }
  },
  deleteProductById: async (ctx) => {
    const { id } = ctx.params;
    try {
      ctx.body = await productDAO.deleteProductById(id);
    } catch (error) {
      errorHandler(error, ctx);
    }
  },
};
export default productsController;
