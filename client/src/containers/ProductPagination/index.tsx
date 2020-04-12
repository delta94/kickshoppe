/**
 * ProductPagination
 */

import React from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDebouncedCallback } from 'use-debounce';
import { useForm, Controller } from 'react-hook-form';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';
import { Row, Card, Input, Pagination, Menu, Dropdown, Button } from 'antd';
import { GET_PRODUCT_PAGINATION } from './gql';
import { IProduct } from 'interfaces';
import FullPageLoader from 'components/Loaders/FullPageLoader';
import ProductDetailModal from 'containers/ProductDetailModal';
import Spacing from 'components/Spacing';
import Col from 'components/Col';
const { Meta } = Card;
const { Search } = Input;

const ProductPaginationContainer = styled.div`
  padding-top: 10rem;
`;

interface IUseQueryState {
  search: string;
  brand: string;
  currentPage: number;
  pageSize: number;
}

export interface BrandsDropdownMenuProps {
  brandNames?: Array<string>;
  onClick?: () => void;
}

export const ProductPagination: React.FC = () => {
  const { handleSubmit, control } = useForm({});
  const [productState, setProductState] = React.useState<IProduct>({
    id: '',
    name: '',
    brand: '',
    title: '',
    desc: '',
    productCategory: '',
    shoe: '',
    retail: 0,
    releaseDate: '',
    colorway: '',
    image: '',
    gender: '',
  });
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [queryState, setQueryState] = React.useState<IUseQueryState>({
    search: '',
    brand: '',
    currentPage: 1,
    pageSize: 20,
  });
  const [queryParams, setQueryParams] = useQueryParams({
    search: StringParam,
    brand: StringParam,
    currentPage: NumberParam,
    pageSize: NumberParam,
  });
  const [getProductPagination, { loading, data }] = useLazyQuery(GET_PRODUCT_PAGINATION, {
    fetchPolicy: 'cache-and-network',
  });

  const products = data && data.productsPagination && data.productsPagination.products;
  const totalCounts = data && data.productPagination && data.productPagination.totalCounts;

  console.log({ data });

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
    if (productState && productState.id) {
      const filterProduct = products.find((ele: any) => {
        return ele._id === productState.id;
      });

      setProductState({
        id: filterProduct && filterProduct._id,
        ...filterProduct,
      });
    }
  }, [productState.id]);

  React.useEffect(() => {
    setQueryState({
      search: (queryParams && queryParams.search) || '',
      brand: (queryParams && queryParams.brand) || '',
      currentPage: (queryParams && queryParams.currentPage) || 1,
      pageSize: (queryParams && queryParams.pageSize) || 20,
    });
  }, []);

  React.useEffect(() => {
    setQueryParams({
      search: queryState.search,
      brand: queryState.brand,
      currentPage: queryState.currentPage,
      pageSize: queryState.pageSize,
    });

    debouncedGetProductPagination({
      search: queryState.search,
      brand: queryState.brand,
      limit: queryState.pageSize,
      skip: queryState.pageSize > 1 ? queryState.pageSize * (queryState.currentPage - 1) : 0,
    });
  }, [queryState.search, queryState.brand, queryState.currentPage, queryState.pageSize]);

  const onFormSubmit = (values: any) => {
    const { search } = values;
    setQueryState({
      ...queryState,
      currentPage: 1,
      search,
    });
  };

  const onShowSizeChange = (current: number, pageSize: number) => {
    setQueryState({
      ...queryState,
      currentPage: current,
      pageSize: pageSize,
    });
  };

  const onChangeCurrentPage = (currentPage: number) => {
    setQueryState({
      ...queryState,
      currentPage,
    });
  };

  //TODO: move to its own component

  const BrandsDropdownMenu = (props: BrandsDropdownMenuProps) => {
    const { brandNames = ['nike', 'adidas', 'puma', 'converse', 'vans'] } = props;
    const menu = (
      <Menu>
        {brandNames.map(name => {
          return (
            <Menu.Item
              key={name}
              onClick={() =>
                setQueryState({
                  ...queryState,
                  brand: name,
                })
              }
            >
              {name}
            </Menu.Item>
          );
        })}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>
          <b>Sort by Brands:</b>&nbsp;{queryState.brand}
        </Button>
      </Dropdown>
    );
  };

  return (
    <ProductPaginationContainer>
      <ProductDetailModal
        product={productState}
        visible={isShowModal}
        onCancel={() => setIsShowModal(false)}
      />

      <Spacing margin="0 0 5rem">
        <Row gutter={24} justify="center">
          <Col span={7}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Controller
                control={control}
                name="search"
                type="textarea"
                defaultValue={queryState.search}
                as={<Search placeholder="Search by brand, etc." />}
              />
            </form>
          </Col>
          <Col>
            <BrandsDropdownMenu />
          </Col>
        </Row>
      </Spacing>

      <Row gutter={24}>
        {loading && <FullPageLoader />}
        {products &&
          products.length > 0 &&
          products.map((product: { _id: string; name: string; brand: string; image: string }) => {
            return (
              <Col key={product._id} padding="0 0 1rem" span={6}>
                <Card
                  style={{ border: 'none', minHeight: '320px' }}
                  onClick={() => {
                    setProductState({
                      ...productState,
                      id: product._id,
                    });
                    setIsShowModal(true);
                  }}
                  hoverable
                  cover={<img style={{ padding: '1rem' }} alt={product._id} src={product.image} />}
                >
                  <Meta title={product.brand} description={product.name} />
                </Card>
              </Col>
            );
          })}
      </Row>

      <Spacing margin="1rem 0 4rem">
        <Row justify="center">
          {totalCounts && totalCounts > 0 ? (
            <Col>
              <Pagination
                onChange={onChangeCurrentPage}
                onShowSizeChange={onShowSizeChange}
                current={queryState.currentPage}
                pageSize={queryState.pageSize}
                total={totalCounts}
                showSizeChanger
              />
            </Col>
          ) : null}
        </Row>
      </Spacing>
    </ProductPaginationContainer>
  );
};

export default ProductPagination;
