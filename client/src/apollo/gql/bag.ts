import gql from 'graphql-tag';

export const SET_BAG_STATE = gql`
  mutation SetBagState($products: [{ productId: String }]) {
    setBagState(products: $products) @client
  }
`;
