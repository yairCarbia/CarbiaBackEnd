import SQLContainer from '../../containers/SQLContainer.js';
import ProductDTO from '../../DTO/productDTO.js';
import { loggerError } from '../../../config/log4.js';
import MySQLConnection from '../../../config/databases/configMySQL.js';
import insertNewElement from '../../../utils/knex/insertElement.js';
import readAllElements from '../../../utils/knex/readElements.js';
import getElementById from '../../../utils/knex/getElementById.js';
import updateElementById from '../../../utils/knex/updateElementById.js';
import deleteElementById from '../../../utils/knex/deleteElementById.js';


const mysql = MySQLConnection.getMySQLConnectionInstance();

let instanceMySQL = null;
class ProductsDAOMySQL extends SQLContainer {
  constructor() {
    super(mysql.configData(), 'products');
  }

  static getInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new ProductsDAOMySQL();
    }
    return instanceMySQL;
  };

  insertProduct = async (productData) => {
    try {
      const addedProduct = await insertNewElement(this.config, this.tableName, productData);
      return addedProduct[0].toString();
    } catch (error) {
      loggerError.error(error);
      throw error.message;
    }
  };

  readProducts = async () => {
    try {
      const products = await readAllElements(this.config, this.tableName);
      if (!products.length) {
        throw new Error(
          'Error al listar: no hay productos cargados en el sistema.'
        );
      }
      return ProductDTO.toDTO(products);
    } catch (error) {
      loggerError.error(error);
      throw error.message;
    }
  };

  readProductById = async (id) => {
    try {
      const product = await getElementById(this.config, this.tableName, id);
      if (!product) {
        throw new Error(
          'Error al listar: no se encontró el producto con el id indicado.'
        );
      }
      return ProductDTO.toDTO(product);
    } catch (error) {
      throw error.message;
    }
  };

  updateProduct = async ({ id }, productData) => {
    try {
      const productUpdated = await updateElementById(this.config, this.tableName, id, productData);
      if (!productUpdated) {
        throw new Error(
          'Error al actualizar: no se encontró el producto con el id indicado.'
        );
      }
      return { success: 'El producto fue actualizado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

  deleteProductById = async (id) => {
    try {
      const productDeleted = await deleteElementById(this.config, this.tableName, id);
      if (!productDeleted) {
        throw new Error(
          'Error al borrar: no se encontró el producto con el id indicado.'
        );
      }
      return { success: 'El producto fue eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

}

export default ProductsDAOMySQL;