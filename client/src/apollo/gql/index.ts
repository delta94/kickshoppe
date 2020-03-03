/**
 * @dev
 *
 */

import gql from 'graphql-tag';

// @dev directly query from state
export const CURRENT_USER_STATE = gql`
  query {
    user @client {
      token
      __typename
    }
  }
`;

// @dev query with resolver
export const GET_CURRENT_USER_STATE = gql`
  query getCurrentUserState {
    getCurrentUserState @client {
      user {
        token
        __typename
      }
    }
  }
`;

export const SET_CURRENT_USER_TOKEN_STATE = gql`
  mutation SetCurrentUserState($token: String) {
    setCurrentUserState(token: $token) @client
  }
`;
