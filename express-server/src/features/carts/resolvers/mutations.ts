import { IResolverMap } from 'interfaces/IResolvers';
import { ApolloError } from 'apollo-server';

/**
 * Add Mongoose models interfaces
 */

export default <IResolverMap>{
  setCartsByUserId: async (parent, { productIds }, { models, user }) => {
    const { uid } = user;
    const { CartsModel } = models;

    console.log('user', user);
    console.log('CartsModel', CartsModel);

    try {
      await CartsModel.updateOne({ uid }, { productIds }).save();

      const response = await models.CartsModel.find({ uid });

      console.log('[setCartsByUserId]', response);

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
