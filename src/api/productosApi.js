//capa de logica de negocio
import { getDao } from '../factory/productsDaoFactory.js'
import ProductosMongoDao from '../pers/DAOs/ProductsMongoDbDao.js'
import ProductosRepo from '../pers/repository/productosRepo.js'

class ProductosApi {
  constructor() {
    this.productosDao = getDao()
    // this.productosDao = new ProductosRepo()
  }

  async getAll() {
    return await this.productosDao.getAll()
  }
  async getOne(_id) {
    return await this.productosDao.getOne(_id)
  }
  async addProd(data) {
    return await this.productosDao.addProd(data)
  }
  async updateProd(_id, data) {
    return await this.productosDao.updateProd(_id, data)
  }

  async deleteOne(_id) {
    return await this.productosDao.deleteOne(_id)
  }
  async deleteAll() {
    return await this.productosDao.deleteAll()
  }
}

export default ProductosApi