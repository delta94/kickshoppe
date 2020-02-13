/*
 *
 * @dev apollo-server error handling doc
 * https://www.apollographql.com/docs/apollo-server/data/errors/#gatsby-focus-wrapper
 */

import { IResolverMap } from 'interfaces/IResolvers';
import {
  ApolloError,
  toApolloError,
  SyntaxError,
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server';

export default <IResolverMap>{
  getProductsById: async (parent, args, { models }, info) => {
    try {
      const products = await models.ProductsModel.findById();
      return products;
    } catch (error) {
      return new ApolloError('Failure!');
    }
  },
  getProductsByIds: async (parent, args, { models }, info) => {
    try {
      const products = await models.ProductsModel.findByIds();
      return products;
    } catch (error) {
      return new ApolloError('Failure!');
    }
  },
  getProductsOne: async (parent, args, { models }, info) => {
    try {
      const products = await models.ProductsModel.findOne();
      return products;
    } catch (error) {
      return new ApolloError('Failure!');
    }
  },
  getProductsMany: async (parent, args, { models }, info) => {
    try {
      const products = await models.ProductsModel.find();
      return products;
    } catch (error) {
      return new ApolloError('Failure!');
    }
  },
  /**
   * @params { limit } - pageSize
   * @params { skip } - pageSize * pageNo
   */
  getProductsLimitPagination: async (parent, { limit, skip, search, brand }, { models }, info) => {
    try {
      const products = await models.ProductsModel.find(
        { name: new RegExp(search, 'i'), brand: new RegExp(brand) },
        null,
        {
          limit,
          skip,
        }
      );

      const count = models.ProductsModel.count({
        name: new RegExp(search, 'i'),
        brand: new RegExp(brand),
      });

      return {
        products,
        totalCount: count,
      };
    } catch (error) {
      return new ApolloError('Failure!');
    }
  },
  getProductsCount: async (parent, args, { models }, info) => {
    try {
      const count = await models.ProductsModel.count();
      return count;
    } catch (error) {
      return new ApolloError('Failure!');
    }
  },
};
