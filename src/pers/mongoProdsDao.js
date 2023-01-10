//DAO prods
import Prods from '../models/prods.model.js';
import { asDto } from './prodsDto.js';

class MongoProdsDao {
  constructor() {}

  async getAll() {
    try {
      const products = await Prods.find({});
      return asDto(products);
    } catch (error) {
      return error;
    }
  }

  async getOne(_id) {
    try {
      const prod = await Prods.findOne({ _id });
      return asDto(prod);
    } catch (error) {
      return error;
    }
  }

  async addOne(data) {
    try {
        const prod = new Prods(data);
        await prod.save();
        return asDto(prod);
    } catch (error) {
      return error
    }
  }

  async putProd(_id, data) {
    try {
      await Prods.findOneAndUpdate({ _id }, data);
      const updatedProd = await Prods.findOne({_id})
      return asDto(updatedProd);
    } catch (error) {
      return error
    }
  }

  async deleteOne(_id) {
    try {
      const prod = await Prods.deleteOne({ _id })
      return asDto(prod)
    } catch (error) {
      return error;
    }
  }

  async deleteALL() {
    try {
      await Prods.deleteMany({});
    } catch (error) {
      return error
    }
  }
}

export default MongoProdsDao
