/**
 * Service:
 * NestJs convention of injecting services e.g with Mongoose.
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsModel } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductsModel>,
  ) {}

  async countsBySearchBrand(search: string, brand: string) {
    return this.productModel.count({
      name: new RegExp(search, 'i'),
      brand: new RegExp(brand, 'i'),
    });
  }

  async limitPagination(
    limit: number,
    skip: number,
    search: string,
    brand: string,
  ) {
    const products: [ProductsModel] = this.productModel.find(
      { name: new RegExp(search, 'i'), brand: new RegExp(brand, 'i') },
      null,
      {
        limit,
        skip,
      },
    );

    return products;
  }
}
