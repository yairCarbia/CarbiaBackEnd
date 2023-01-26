import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  thumbnail: { type: String, required: false, trim: true },
});

productsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model('Products', productsSchema);
