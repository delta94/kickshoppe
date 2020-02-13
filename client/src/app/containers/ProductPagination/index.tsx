/**
 *
 * ProductPagination
 *
 */

import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDebouncedCallback } from 'use-debounce';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';
import FullPageLoader from 'app/components/Loaders/FullPageLoader';
import { Row, Card, Input } from 'antd';
import { GET_PRODUCT_PAGINATION } from './gql';

import Spacing from 'app/components/Spacing';
import Col from 'app/components/Col';

import { useSprings, animated } from 'react-spring';
import styled from 'styled-components';

const { Meta } = Card;
const { Search } = Input;

const ProductPaginationContainer = styled.div`
  padding-top: 10rem;
`;

export const ProductPagination: React.FC = () => {
  const [query, setQuery] = useQueryParams({
    search: StringParam,
    brand: StringParam,
    limit: NumberParam,
    skip: NumberParam,
  });
  const { search, brand, limit, skip } = query;

  const [getProductPagination, { loading, error, data }] = useLazyQuery(GET_PRODUCT_PAGINATION, {
    fetchPolicy: 'cache-and-network',
  });

  console.log(data);

  // handle debounce
  const [debouncedSearchOnChange] = useDebouncedCallback((searchValue: string) => {
    setQuery({
      search: searchValue,
    });
  }, 1000);

  const [debouncedGetProductPagination] = useDebouncedCallback(({ search, brand, limit, skip }) => {
    getProductPagination({
      variables: {
        search,
        brand,
        limit,
        skip,
      },
    });
  }, 1000);

  React.useEffect(() => {
    debouncedGetProductPagination({
      search,
      brand,
      limit,
      skip,
    });
  }, [search, brand, limit, skip]);

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchOnChange(event.target.value);
  };

  return (
    <ProductPaginationContainer>
      <button onClick={() => setQuery({ search: 'nike' })}>TEST lA</button>
      <button onClick={() => setQuery({}, 'replace')}>CLEAR</button>

      <Spacing margin="0 0 5rem">
        <Row type="flex" justify="center">
          <Col span={7}>
            <Search placeholder="Search by brand, etc." onChange={handleSearchOnChange} />
          </Col>
        </Row>
      </Spacing>

      <Row gutter={24}>
        {loading && <FullPageLoader />}
        {data &&
          data.getProductsLimitPagination &&
          data.getProductsLimitPagination.products &&
          data.getProductsLimitPagination.products.map(
            (product: { _id?: string; name?: string; brand?: string; image?: string }) => {
              return (
                <Col padding="0 0 1rem" span={6}>
                  <Card
                    style={{ minHeight: '350px' }}
                    hoverable
                    cover={
                      <img style={{ padding: '1rem' }} alt={product._id} src={product.image} />
                    }
                  >
                    <Meta title={product.brand} description={product.name} />
                  </Card>
                </Col>
              );
            }
          )}
      </Row>
    </ProductPaginationContainer>
  );
};

export default ProductPagination;
