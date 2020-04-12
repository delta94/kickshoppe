import { IResolverMap } from 'interfaces/IResolvers';

export default <IResolverMap>{
  createStockxs: async (parent, args, { models }) => {
    try {
      return {
        ok: false,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
