/*
 *
 * @dev apollo-server error handling doc
 * https://www.apollographql.com/docs/apollo-server/data/errors/#gatsby-focus-wrapper
 */

import { IResolverMap } from 'interfaces/IResolvers';
import { ApolloError } from 'apollo-server';

export default <IResolverMap>{
  getCartsByUserId: async (parent, args, { models, user }) => {
    const { uid } = user;

    try {
      const carts = await models.Carts.findById(uid);

      console.log('[getCartsByUserId - carts]', carts);

      return carts;
    } catch (error) {
      return new ApolloError('Failure!');
    }
  },
};
