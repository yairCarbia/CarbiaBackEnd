import mongoose from 'mongoose'

const uri = process.env.MONGO_URI
mongoose.set('strictQuery', false);
mongoose.connect(uri)
  .then(()=>console.log('db connected'))
