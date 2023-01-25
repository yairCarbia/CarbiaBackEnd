import BookDao from '../dao/bookDao.js';

class BookApi{
  constructor(){
    this.dao = new BookDao()
  }

  async getAll(){
    return await this.dao.getAll()
  }

  async getOne(id){
    return await this.dao.getOne(id)
  }

  async addOne(data){
    return await this.dao.addOne(data)
  }

  async putOne(id, data){
    return await this.dao.putOne(id, data)
  }

  async deleteOne(id){
    return await this.dao.deleteOne(id)
  }
}

export default BookApi