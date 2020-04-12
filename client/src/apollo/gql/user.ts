/**
 * @dev
 *
 */

import gql from 'graphql-tag';

// @dev directly query from state
export const CURRENT_USER_STATE = gql`
  query {
    user @client {
      accessToken
    }
  }
`;

// @dev query with resolver
export const GET_CURRENT_USER_STATE = gql`
  query getCurrentUserState {
    getCurrentUserState @client {
      user {
        accessToken
      }
    }
  }
`;

export const SET_CURRENT_USER_TOKEN_STATE = gql`
  mutation SetCurrentUserState($accessToken: String) {
    setCurrentUserState(accessToken: $accessToken) @client
  }
`;
