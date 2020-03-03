import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import cache from 'apollo/cache';
import resolvers from 'apollo/resolvers';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const request = async (operation: any) => {
  const token = await localStorage.getItem('x-token');
  // set the token in the request header for authorization
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
};

export const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.error('[graphQLErrors]', graphQLErrors);
    }
    if (networkError) {
      console.error('[networkError]', networkError);
    }
  }),
  requestLink,
  new HttpLink({
    uri: SERVER_URL,
    // For server with different domain use "include"
    credentials: 'same-origin',
  }),
]);

const client = new ApolloClient({
  cache,
  link,
  resolvers,
});

export default client;
