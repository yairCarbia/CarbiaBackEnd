import axios from 'axios';
import { APP_PORT } from '../src/config/index.js';
import { loggerError, loggerInfo } from '../src/config/log4.js';

let url = `http://localhost:${APP_PORT}/api/products`;

const getAllProducts = async () => {
  try {
    const products = await axios.get(url);
    loggerInfo.info('Productos: ', products.data);
  } catch (error) {
    loggerError.error(
      'HTTP status: ',
      error.response.status,
      ' - ',
      error.response.data.error
    );
  }
};

const getProduct = async (id) => {
  try {
    const product = await axios.get(`${url}/${id}`);
    loggerInfo.info(`El producto con el id = [${id}] es: `, product.data);
  } catch (error) {
    loggerError.error(
      'HTTP status: ',
      error.response.status,
      ' - ',
      error.response.data.error
    );
  }
};

const addProduct = async (productData) => {
  try {
    const addedProductId = await axios.post(url, productData);
    loggerInfo.info('Id producto añadido: ', addedProductId.data);
    return addedProductId.data;
  } catch (error) {
    loggerError.error(
      'HTTP status: ',
      error.response.status,
      ' - ',
      error.response.data.error
    );
  }
};

const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${url}/${id}`, productData);
    loggerInfo.info(response.data.success);
  } catch (error) {
    loggerError.error(
      'HTTP status: ',
      error.response.status,
      ' - ',
      error.response.data.error
    );
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    loggerInfo.info(response.data.success);
  } catch (error) {
    loggerError.error(
      'HTTP status: ',
      error.response.status,
      ' - ',
      error.response.data.error
    );
  }
};

/* ---------------------------- functions calling ---------------------------- */

(async () => {
  try {
    console.info('Get de todos los productos: ');
    await getAllProducts();
  } catch (error) {
    throw error;
  }

  let id = null;
  try {
    console.info('\nPost de nuevo producto: ');
    id = await addProduct({
      title: 'Chanclas',
      price: 100,
      thumbnail:
        'https://cdn0.iconfinder.com/data/icons/travel-filled-line-4/64/Travel-Filled-25-64.png',
    });
  } catch (error) {
    throw error;
  }

  try {
    console.info('\nPost de nuevo producto sin un campo requerido: ');
    await addProduct({
      price: 100,
      thumbnail:
        'https://cdn0.iconfinder.com/data/icons/travel-filled-line-4/64/Travel-Filled-25-64.png',
    });
  } catch (error) {
    throw error;
  }

  try {
    console.info('\nGet de producto por id: ');
    await getProduct(id);
  } catch (error) {
    throw error;
  }

  try {
    console.info('\nGet de producto con id inexistente: ');
    await getProduct('6397ade98336bc2b8db2a23f');
  } catch (error) {
    throw error;
  }

  try {
    console.info('\nPut de producto: ');
    await updateProduct(id, {
      title: 'Gorra rosa',
      price: 100000,
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/summer-vol-1-6/512/summer_set-15-256.png',
    });
  } catch (error) {
    throw error;
  }

  try {
    console.info('\nPut de producto sin un campo requerido: ');
    await updateProduct(id, {
      price: 100000,
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/summer-vol-1-6/512/summer_set-15-256.png',
    });
  } catch (error) {
    throw error;
  }

  try {
    console.info('\nPut de producto con id inexistente: ');
    await updateProduct('6397ade98336bc2b8db2a23f', {
      title: 'Gorra rosa',
      price: 100000,
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/summer-vol-1-6/512/summer_set-15-256.png',
    });
  } catch (error) {
    throw error;
  }

  try {
    console.info('\nDelete de producto: ');
    await deleteProduct(id);
  } catch (error) {
    throw error;
  }

  try {
    console.info('\nDelete de producto con id inexistente: ');
    await deleteProduct('6397ade98336bc2b8db2a23f');
  } catch (error) {
    throw error;
  }
})();




