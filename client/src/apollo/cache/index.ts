/**
 * Migration of apollo-link-state after v2.5> deprecated
 * https://www.apollographql.com/docs/react/data/local-state/#migrating-from-apollo-link-state
 */

import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({});

// Initialise Cache
cache.writeData({
  data: {
    user: {
      accessToken: null,
      __typename: 'user',
    },
    cart: [
      {
        productId: null,
        __typename: 'product',
      },
    ],
    loginModal: {
      visible: false,
      __typename: 'loginModal',
    },
    registerModal: {
      visible: false,
      __typename: 'registerModal',
    },
  },
});

export default cache;
