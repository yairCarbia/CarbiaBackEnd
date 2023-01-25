import bookDto from './bookDto.js';
import booksModel from '../models/books.model.js';

class BookDao{
  constructor(){}

  async getAll(){
    try {
      const books = await booksModel.find({})
      return bookDto(books)
    } catch (error) {
      return error
    }
  }

  async getOne(id){
    try {
      const book = await booksModel.findById(id)
      return bookDto(book)
    } catch (error) {
      return error
    }
  }

  async addOne(data){
    try {
      const prod = new booksModel(data)
      await prod.save()
      return bookDto(prod)
    } catch (error) {
      return error
    }
  }

  async putOne(_id, data){
    try {
      const book = await booksModel.findOneAndUpdate({_id}, data, {new: true})
      return bookDto(book)
    } catch (error) {
      return error
    }
  }

  async deleteOne(_id){
    try {
      await booksModel.deleteOne({_id})
    } catch (error) {
      return error
    }
  }

}

export default BookDao