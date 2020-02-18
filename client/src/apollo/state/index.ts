import { InMemoryCache } from 'apollo-cache-inmemory';
import mutations from 'apollo/state/resolvers/mutations';
import queries from 'apollo/state/resolvers/queries';

export default (memoryCache: InMemoryCache) => {
  return {
    cache: memoryCache,
    defaults: {
      isConnected: false,
      user: {
        token: null, // if token is available user is signedIn
        __typename: 'user',
      },
    },
    resolvers: {
      Mutation: mutations,
      Query: queries,
    },
  };
};
