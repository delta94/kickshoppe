import request from 'request-promise';
import fs from 'fs';
import { headers } from 'constants/request';

const fetchProductDetails = async (product, options) => {
  const { currency, proxy } = options;
  const variantArray = [];
  let webURL;

  if (typeof product == 'string') {
    if (product.includes('stockx.com/')) webURL = product.split('stockx.com/')[1].split('/')[0];
    else webURL = product;
  } else webURL = product.urlKey;

  const requestOptions = {
    uri: `https://stockx.com/api/products/${webURL}?includes=market&currency=${currency}`,
    headers: headers,
    simple: false,
    resolveWithFullResponse: true,
    proxy: proxy,
  };

  const res = await request(requestOptions);
  const body = JSON.parse(res.body);
  const { Product } = body;

  fs.writeFileSync('productDetails', Product);

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

export default fetchProductDetails;
