/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const GET_PRODUCT_PAGINATION = gql`
  query AllProduct($search: String, $brand: String, $limit: Int, $skip: Int) {
    getProductsLimitPagination(search: $search, brand: $brand, limit: $limit, skip: $skip) {
      totalCount
      products {
        _id
        name
        brand
        retail
        image
      }
    }
  }
`;
