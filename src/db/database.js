import mongoose from 'mongoose';

const URI = process.env.MONGOOSE_URI
mongoose.connect(URI)
  .then(() => console.log('db connected'));
