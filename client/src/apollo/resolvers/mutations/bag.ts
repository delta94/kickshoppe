import { ResolverMap } from 'interfaces/ResolverMap';
import { ProductProps } from 'interfaces/ProductProps';
import { ResolverResponseStatus } from 'enums/ResolverResponseStatus';

const bagMutation: ResolverMap = {
  setBagState: async (root, { products }, { cache }) => {
    try {
      const mapProducts = products.map((item: ProductProps & { quantity: Number }) => {
        return {
          _id: item._id,
          name: item.name,
          brand: item.brand,
          title: item.title,
          desc: item.desc,
          quantity: item.quantity,
          __typename: 'bag',
        };
      });

      const data = {
        bag: mapProducts,
      };

      cache.writeData({ data });

      return {
        data,
        status: ResolverResponseStatus.Success,
      };
    } catch (error) {
      return {
        status: ResolverResponseStatus.Failure,
        message: error.message,
      };
    }
  },
};

export default bagMutation;
