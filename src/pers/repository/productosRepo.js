import prodsDto, { asDto } from '../DTOs/ProdsDto.js' 
import { getDao } from '../../factory/productsDaoFactory.js'


class ProductosRepo{
  constructor(){
    this.dao = getDao()
  }

  static async getAll(){
    const dto = await this.dao.getAll()
    return dto.map(el => asDto(el))
  }
  
  static async getOne(_id){
    const dto = await this.dao.getOne(_id)
    return asDto(dto)
  }

  static async addProd(data){
    const dto = await this.dao.addProd(data)
    return asDto(dto)
  }

  static async updateProd(_id, data){
    const dto = await this.dao.updateProd(_id, data)
    return asDto(dto)
  }
  
  static async deleteOne(_id){
    await this.dao.deleteOne(_id)
  }

  static async deleteAll(){
    await this.dao.deleteAll()
  }
}

export default ProductosRepo