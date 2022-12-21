import {Schema, model} from 'mongoose' 

const ProdSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  stock: Number
})

const ProdModel = model('prods', ProdSchema)

export default ProdModel

