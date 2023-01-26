import MongoDBContainer from '../../containers/mongoDBContainer.js';
import productModel from '../../../models/mongoose/products.model.js';
import ProductDTO from '../../DTO/productDTO.js';
import { loggerError } from '../../../config/log4.js';

let instanceMongoDB = null;
class ProductsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = productModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new ProductsDAOMongoDB();
    }
    return instanceMongoDB;
  };

  insertProduct = async (productData) => {
    try {
      const addedProduct = await this.collectionName.create(productData);
      return addedProduct.id;
    } catch (error) {
      loggerError.error(error);
      throw error.message;
    }
  };

  readProducts = async () => {
    try {
      const products = await this.collectionName.find();
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
      const product = await this.collectionName.findById(id);
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
      const productUpdated = await this.collectionName.findByIdAndUpdate(
        { _id: id },
        productData
      );
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
      const productDeleted = await this.collectionName.findByIdAndRemove(
        { _id: id },
        { rawResult: true }
      );
      if (!productDeleted.value) {
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

export default ProductsDAOMongoDB;
