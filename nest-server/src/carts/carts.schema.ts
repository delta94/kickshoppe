import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  uid: String,
  cart: [
    {
      name: String,
      brand: String,
      title: String,
      desc: String,
      productCategory: String,
      shoe: String,
      retail: Number,
      image: String,
      quantity: Number,
    },
  ],
});
