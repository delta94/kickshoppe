/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 */

import gql from 'graphql-tag';

export const GET_PAYMENT = gql`
  query {
    getPayment {
      id
      task
      checked
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($task: String!, $checked: Boolean!) {
    createPayment(task: $task, checked: $checked) {
      id
      task
      checked
    }
  }
`;

export const DELETE_PAYMENT = gql`
  mutation DeletePayment($id: ID!) {
    deletePaymentById(id: $id) {
      task
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($task: String!, $id: ID!, $checked: Boolean!) {
    updatePaymentsById(task: $task, id: $id, checked: $checked) {
      task
    }
  }
`;