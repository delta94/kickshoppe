/**
 * @dev fieldName: (obj, args, context, info) => result;
 */

import { InMemoryCache } from 'apollo-cache-inmemory';

export default {
  updateNetworkStatus: (
    _: any,
    { isConnected }: { isConnected: boolean },
    { cache }: { cache: InMemoryCache }
  ) => {
    cache.writeData({ data: { isConnected } });
    return null;
  },
  setCurrentUserState: (
    _: any,
    { token }: { token: string },
    { cache }: { cache: InMemoryCache }
  ) => {
    cache.writeData({ data: { user: { token } } });
    return null;
  },
};
