import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  title: String,
  desc: String,
  productCategory: String,
  shoe: String,
  retail: Number,
  releaseDate: String,
  colorway: String,
  image: String,
  urlKey: String,
  gender: String,
});
