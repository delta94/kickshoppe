/**
 * Service:
 * NestJs convention of injecting services e.g with Mongoose.
 */

import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HEADERS as STOCKX_HEADERS } from './stockx.http-header';
import { ProductsModel } from 'src/products/products.model';
import StockxAPI from 'stockx-api';

class StockXConstructor {
  constructor(...args: any) {}
}
@Injectable()
export class StockxService {
  private stockx: typeof StockXConstructor = new StockxAPI();
  constructor(
    @InjectModel('Product') private productModel: Model<ProductsModel>,
    private httpService: HttpService,
  ) {}

  insertMany = async (products: ProductsModel[]) => {
    console.log('[PRODUCTS]', products);
    return this.productModel.insertMany(products);
  };

  loginToStockx = async (user: string, password: string) => {
    const newStockx: any = this.stockx;
    return await newStockx.login({ user, password });
  };

  fetchStockxProductDetails = async (product, options) => {
    const { currency } = options;
    const variantArray = [];
    let webURL;

    if (typeof product == 'string') {
      if (product.includes('stockx.com/'))
        webURL = product.split('stockx.com/')[1].split('/')[0];
      else webURL = product;
    } else webURL = product.urlKey;

    const requestOptions = {
      uri: `https://stockx.com/api/products/${webURL}?includes=market&currency=${currency}`,
      headers: STOCKX_HEADERS,
      simple: false,
      resolveWithFullResponse: true,
    };

    const res: any = this.httpService.request(requestOptions);
    console.log(res);

    const body = JSON.parse(res && res.body);
    const { Product } = body;
    const variants = body.Product.children;

    for (let key in variants) {
      variantArray.push({
        size: variants[key].shoeSize,
        uuid: key,
        market: variants[key].market,
      });
    }

    return {
      name: body['Product'].title,
      urlKey: body['Product'].urlKey,
      pid: body['Product'].styleId,
      uuid: body['Product'].uuid,
      variants: variantArray,
    };
  };

  searchStockxProducts = async (
    query: string,
    options?: {
      limit?: number;
      dataType?: string;
      productCategory?: string;
      proxy?: string;
      page?: number;
    },
  ) => {
    const { limit, dataType, productCategory, page } = options;
    const uri =
      dataType === undefined
        ? `https://stockx.com/api/browse?productCategory=${productCategory}&page=${page}`
        : `https://stockx.com/api/browse?productCategory=${productCategory}&page=${page}&dataType=${dataType}`;
    const requestOptions = {
      // method: 'get',
      url: uri,
      headers: STOCKX_HEADERS,
      simple: false,
      resolveWithFullResponse: true,
    };

    const res: any = await this.httpService
      .get(uri, requestOptions)
      .toPromise();

    console.log(`PAGE ${page}`);
    const { Products } = res.data;
    const target = limit !== undefined ? Products.slice(0, limit) : Products;
    const productArray = target.map((product: any) => {
      const image = new URL(product.media.imageUrl, 'https://stockx.com').href;

      return {
        pid: product.styleId,
        uuid: product.market.prodsuctUuid,
        name: product.name,
        brand: product.brand,
        title: product.title,
        desc: product.shortDescription,
        productCategory: product.productCategory,
        shoe: product.shoe,
        retail: product.retailPrice,
        releaseDate: product.releaseDate,
        colorway: product.color,
        image,
        urlKey: product.urlKey,
        market: product.market,
        gender: product.gender,
      };
    });

    if (productArray === '') throw new Error('No products found!');
    // Add
    else return productArray;
  };
}
