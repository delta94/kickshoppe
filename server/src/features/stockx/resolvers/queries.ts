/*
 *
 * @dev apollo-server error handling doc
 * https://www.apollographql.com/docs/apollo-server/data/errors/#gatsby-focus-wrapper
 */

import { IResolverMap } from 'interfaces/IResolvers';
import stockxAPI from 'stockx-api';
import searchProducts from 'api/scrapers/searchProducts';
import { ApolloError } from 'apollo-server';
import fs from 'fs';
import { model } from 'mongoose';

const stockX = new stockxAPI();
const stockXUserName = process.env.STOCKX_USERNAME;
const stockXPassword = process.env.STOCKX_PASSWORD;

export default <IResolverMap>{
  scrape: async (parent, args, { models }, info) => {
    console.log(models);
    const { ProductsModel } = models;

    try {
      //Logs in using account email and password
      let productLists: Array<{}> = [];
      await stockX.login({
        user: stockXUserName,
        password: stockXPassword,
      });
      console.log('Successfully logged in! to Stock X');
      const productKeywords = ['nike', 'adidas', 'puma', 'vans', 'converse', 'gucci'];
      await Promise.all(
        productKeywords.map(async keyword => {
          let response = await searchProducts(keyword, {
            limit: 1000,
            productCategory: 'sneakers',
          });

          const mappedResponse = response.map((ele: any) => {
            return {
              name: ele.name,
              brand: keyword,
              retail: ele.retail,
              releaseDate: ele.releasDate,
              image: ele.image,
              urlKey: ele.urlKey,
            };
          });

          productLists.push(...mappedResponse);
        })
      );
      if (productLists.length > 0) {
        fs.writeFileSync('productList.json', JSON.stringify(productLists));
        await ProductsModel.insertMany(productLists);
        return {
          ok: true,
        };
      }
    } catch (error) {
      return new ApolloError('Failure!');
    }
  },
};
