/**
 * Migration of apollo-link-state after v2.5> deprecated
 * https://www.apollographql.com/docs/react/data/local-state/#migrating-from-apollo-link-state
 */

import { InMemoryCache } from 'apollo-cache-inmemory';
import { LocalStorage } from 'enums/LocalStorage';

const cache = new InMemoryCache({});
const accessToken = localStorage.getItem(LocalStorage.X_TOKEN);

const data = {
  user: {
    accessToken,
    __typename: 'user',
  },
  bag: [
    {
      _id: '5e8aced30bf9021922dd4dc1',
      brand: 'adidas',
      colorway: null,
      desc: 'adidas-Yeezy-Boost-350-V2-Cinder',
      gender: 'men',
      image:
        'https://stockx.imgix.net/adidas-Yeezy-Boost-350-V2-Cinder_01.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1585357645',
      name: 'Cinder',
      productCategory: 'sneakers',
      releaseDate: '2020-03-21 23:59:59',
      retail: 220,
      shoe: 'adidas Yeezy Boost 350 V2',
      title: 'adidas Yeezy Boost 350 V2 Cinder',
      __typename: 'bag',
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
};

cache.writeData({ data });

export default cache;
