import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
  title: String,
  price: Number,
  author: String
})

export default model('books', bookSchema)