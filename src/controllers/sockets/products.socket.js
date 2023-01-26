import { PERSISTENCY } from '../../config/index.js';
import { loggerError } from '../../config/log4.js';
import DAOFactory from '../../persistency/DAO/DAOFactory.js';

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

export default async (io, socket) => {
  try {
    /* ----------------------- carga inicial de productos ----------------------- */
    socket.emit('view-products', await productDAO.readProducts());
  } catch (error) {
    io.sockets.emit('view-products', { error });
  }

  /* ----------------------- actualizacion de productos ----------------------- */
  socket.on('update-product', async (product) => {
    try {
      const productId = await productDAO.insertProduct(product);
      io.sockets.emit('view-products', await productDAO.readProducts());
    } catch (error) {
      io.sockets.emit('view-products', { error });
    }
  });
};
