/**
 *
 * Tests
 * React testing library with React Apollo
 * @see https://www.apollographql.com/docs/react/development-testing/testing/
 * @see https://github.com/styled-components/jest-styled-components
 *
 */

import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';
import 'jest-styled-components';
import React from 'react';
import { render } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MockedProvider, MockedProviderProps } from '@apollo/react-testing';
import localResolvers from 'apollo/resolvers';
import Payment from '../index';
import { GET_PAYMENT, CREATE_PAYMENT, DELETE_PAYMENT, UPDATE_PAYMENT } from '../gql'

const defaultComponentProps = {};

const renderComponent = ({
  cache,
  mocks,
  resolvers = localResolvers,
  addTypename,
  componentProps,
}: MockedProviderProps & {
  componentProps?: any;
}) =>
  render(
    <MockedProvider cache={cache} mocks={mocks} resolvers={resolvers} addTypename={addTypename}>
      <Payment {...defaultComponentProps} {...componentProps} />
    </MockedProvider>
  );

describe("<Payment />", () => {
  it("should render on load", () => {
    // @dev for testing with initial cache, 
    // we initialise our cache with the data we want to write
    const cache = new InMemoryCache(),
    const initialCache = {
      data: {
        user: {
          accessToken: 'someToken'
        }
      }
    }
    cache.writeData(initialCache)
    const mockToken = 'fakeToken'
    const queryMock = {
      request: {
        query: GET_PAYMENT,
        variables: {
          accessToken: mockToken,
        },
      },
      result: {
        data: {
          getPayment: {
            id: 'someId',
            task: 'someTask',
            checked: true
          },
        },
      },
    }
    const mutationMock = {
      request: {
        query: CREATE_PAYMENT,
        variables: {
          task: 'someTask',
          checked: false
        },
      },
      result: {
        data: {
          createPayment: {
            id: 'someId',
            task: 'someTask',
            checked: false
          },
        },
      },
    }
    const mocksProp = [queryMock,mutationMock]
    const mockComponentProps = {
      someProp: 'hey'
    }

    const {} =  renderComponent({ cache, mocks: mocksProp, componentProps: mockComponentProps });
    expect(true).toBe(true);
  });
});
