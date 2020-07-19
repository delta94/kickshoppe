/**
 *
 * ProductDetailModal
 *
 */

import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { format } from 'date-fns';
import { Button, Modal } from 'antd';
import { ProductProps } from 'interfaces/ProductProps';
import { CURRENT_USER_STATE } from 'apollo/gql';
import { TOGGLE_LOGIN_MODAL } from 'apollo/gql/modals';

const UnOrderList = styled.ul`
  text-transform: uppercase;
  list-style: none;
  padding: 0;
`;

const ProductDetailModalImg = styled.img`
  width: 100%;
  display: flex;
  margin: 0 auto;
`;

export const ProductDetailModal = ({
  product,
  visible,
  onCancel,
}: {
  product: ProductProps;
  visible: boolean;
  onCancel: () => void;
}) => {
  const [toggleLoginModal] = useMutation(TOGGLE_LOGIN_MODAL);
  const { data } = useQuery(CURRENT_USER_STATE);
  const isCurrentUser = !!data && !!data.user && !!data.user.accessToken;
  const { _id, name, brand, title, retail, releaseDate, colorway, image, gender } = product;

  console.log('isCurrentUser', isCurrentUser);

  const handleAddToCart = () => {
    if (!isCurrentUser) {
      toggleLoginModal({ variables: { visible: true } });
    }

    if (isCurrentUser) {
    }
  };

  return (
    <Modal
      centered
      key={`${_id}`}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleAddToCart}>
          Add to cart
        </Button>,
      ]}
      onCancel={onCancel}
      visible={visible}
    >
      <ProductDetailModalImg src={`${image}`} />
      <UnOrderList>
        {brand && <li style={{ fontSize: '24px' }}> {brand}</li>}
        {name && <li> {name}</li>}
        {title && <li> {title}</li>}
        {colorway && (
          <li>
            <b>color</b> {colorway}
          </li>
        )}
        {releaseDate && (
          <li>
            <b>release date</b> {format(new Date(releaseDate), 'dd/MM/yyy')}
          </li>
        )}
        {retail && (
          <li>
            <b>retail price</b> US${retail}
          </li>
        )}
        {gender && (
          <li>
            <b>gender</b> {gender}
          </li>
        )}
      </UnOrderList>
    </Modal>
  );
};

export default ProductDetailModal;
