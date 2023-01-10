import { Schema, model } from 'mongoose'

const ProdSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
})

const ProdModel = model('prods', ProdSchema )
export default ProdModel