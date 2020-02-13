/*
 * @see
 * https://mongoosejs.com/docs/guide.html#definition
 * https://mongoosejs.com/docs/schematypes.html#what-is-a-schema-type
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IProducts extends Document {
  name: String;
  brand: String;
  retail: Number;
  releaseDate: String;
  image: String;
  urlKey: String;
}

const ProductsSchema: Schema = new Schema({
  name: String,
  brand: String,
  retail: Number,
  releaseDate: String,
  image: String,
  urlKey: String,
});

const ProductsModel = mongoose.model<IProducts>('Products', ProductsSchema);

export { ProductsModel };
