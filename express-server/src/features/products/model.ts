/*
 * @see
 * https://mongoosejs.com/docs/guide.html#definition
 * https://mongoosejs.com/docs/schematypes.html#what-is-a-schema-type
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IProducts extends Document {
  name: String;
  brand: String;
  title: String;
  desc: String;
  productCategory: String;
  shoe: String;
  retail: Number;
  releaseDate: String;
  colorway: String;
  image: String;
  urlKey: String;
  gender: String;
}

const ProductsSchema: Schema = new Schema({
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

const ProductsModel = mongoose.model<IProducts>('Products', ProductsSchema);

export { ProductsModel };
