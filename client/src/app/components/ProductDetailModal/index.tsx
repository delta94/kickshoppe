/**
 *
 * ProductDetailModal
 *
 */

import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Button, Modal } from 'antd';
import { IProduct } from 'interfaces';

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
  product: IProduct;
  visible: boolean;
  onCancel: () => void;
}) => {
  const { id, name, brand, title, retail, releaseDate, colorway, image, gender } = product;

  return (
    <Modal
      key={`${id}`}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => console.log('this will add to cart')}>
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
