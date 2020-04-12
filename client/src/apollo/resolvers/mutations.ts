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
    { accessToken }: { accessToken: string },
    { cache }: { cache: InMemoryCache }
  ) => {
    const data = {
      user: {
        accessToken,
        __typename: 'user',
      },
    };

    cache.writeData({ data });
    return null;
  },
  toggleLoginModal: (
    _: any,
    { visible }: { visible: boolean },
    { cache }: { cache: InMemoryCache }
  ) => {
    const data = {
      loginModal: {
        visible,
        __typename: 'loginModal',
      },
    };

    cache.writeData({ data });
    return null;
  },
  toggleRegisterModal: (
    _: any,
    { visible }: { visible: boolean },
    { cache }: { cache: InMemoryCache }
  ) => {
    const data = {
      registerModal: {
        visible,
        __typename: 'registerModal',
      },
    };
    cache.writeData({ data });
    return null;
  },
};
