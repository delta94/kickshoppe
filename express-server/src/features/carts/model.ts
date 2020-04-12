/*
 * @see
 * https://mongoosejs.com/docs/guide.html#definition
 * https://mongoosejs.com/docs/schematypes.html#what-is-a-schema-type
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface ICarts extends Document {
  uid: Schema.Types.ObjectId;
  productIds: [Schema.Types.ObjectId];
}

const CartsSchema: Schema = new Schema(
  {
    uid: { type: Schema.Types.ObjectId, required: true },
    productIds: [Schema.Types.ObjectId],
  },
  { _id: false }
);

const CartsModel = mongoose.model<ICarts>('Carts', CartsSchema);

export { CartsModel };
