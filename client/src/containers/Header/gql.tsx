/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const GET_HEADER = gql`
  query {
    getHeader {
      id
      task
      checked
    }
  }
`;
