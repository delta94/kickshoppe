import { URL } from 'url';
import fs from 'fs';
import request from 'request-promise';
import { headers } from 'constants/request';

const searchProducts = async (
  query: string,
  options?: {
    limit?: number;
    dataType?: string;
    proxy?: string;
    productCategory?: string;
    page?: number;
  }
) => {
  const { limit, dataType, proxy, productCategory, page } = options;
  const uri =
    dataType == undefined
      ? `https://stockx.com/api/browse?productCategory=${productCategory}&page=${page}`
      : `https://stockx.com/api/browse?productCategory=${productCategory}&page=${page}&dataType=${dataType}`;

  const requestOptions = {
    uri: uri,
    headers: headers,
    simple: false,
    resolveWithFullResponse: true,
    proxy: proxy,
  };

  const res = await request(requestOptions);
  const body = JSON.parse(res.body);
  const { Products } = body;

  fs.writeFileSync('scrapedata.json', JSON.stringify(Products));

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

  if (productArray == '') throw new Error('No products found!');
  else return productArray;
};

export default searchProducts;
