/**
 * Modals gql
 */

import gql from 'graphql-tag';

export const IS_LOGIN_MODAL_VISIBLE = gql`
  query {
    loginModal @client {
      visible
    }
  }
`;

export const IS_REGISTER_MODAL_VISIBLE = gql`
  query {
    registerModal @client {
      visible
    }
  }
`;

// @dev directly query from state
export const TOGGLE_LOGIN_MODAL = gql`
  mutation ToggleLoginModal($visible: boolean) {
    toggleLoginModal(visible: $visible) @client
  }
`;

// @dev query with resolver
export const TOGGLE_REGISTER_MODAL = gql`
  mutation ToggleRegisterModal($visible: boolean) {
    toggleRegisterModal(visible: $visible) @client
  }
`;

export const SET_CURRENT_USER_TOKEN_STATE = gql`
  mutation SetCurrentUserState($accessToken: String) {
    setCurrentUserState(accessToken: $accessToken) @client
  }
`;
