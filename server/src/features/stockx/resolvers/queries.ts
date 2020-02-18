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
    const { ProductsModel } = models;

    const totalPage = 25;

    try {
      //Logs in using account email and password
      await stockX.login({
        user: stockXUserName,
        password: stockXPassword,
      });
      console.log('Successfully logged in! to Stock X');

      let promises = [];

      for (let i: number = 0; i < totalPage; i++) {
        promises.push(
          await searchProducts(null, {
            page: i,
            productCategory: 'sneakers',
          })
        );
      }

      const results = await Promise.all(promises);

      if (results.length > 0) {
        fs.writeFileSync('productList.json', JSON.stringify(results.flat()));
        await ProductsModel.insertMany(results.flat());
        return {
          ok: true,
        };
      }
    } catch (error) {
      return new Error(error);
    }
  },
};
