//logica de negocio

import MongoProdsDao from '../pers/mongoProdsDao.js';

class ProductsAPi{
  constructor(){
    this.productsDao = new MongoProdsDao()
  }
  async getAll(){
    return await this.productsDao.getAll()
  }
  async getOne(id){
    return await this.productsDao.getOne(id)
  }
  async addOne(data){
    return await this.productsDao.addOne(data)
  }
  async putProd(id, data){
    return await this.productsDao.putProd(id, data)
  }
  async deleteOne(id){
    return await this.productsDao.deleteOne(id)
  }
  async deleteAll(){
    return await this.productsDao.deleteALL()
  }
}

export default ProductsAPi