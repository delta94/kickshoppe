/**
 * @dev fieldName: (obj, args, context, info) => result;
 */

import { InMemoryCache } from 'apollo-cache-inmemory';
import { CURRENT_USER_STATE } from 'apollo/state/gql';

export default {
  getCurrentUserState: async (_: any, args: any, context: { cache: InMemoryCache }) => {
    const { cache } = context;
    const data: any = cache.readQuery({
      query: CURRENT_USER_STATE,
    });

    const user = data && data.user;

    return user;
  },
};
