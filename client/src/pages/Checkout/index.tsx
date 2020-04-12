import React from 'react';
import { Row, Card, Button } from 'antd';
import Payment from 'containers/Payment';
import Col from 'components/Col';
import Container from 'components/Container';
import styled from 'styled-components';
import Spacing from 'components/Spacing';

const Checkout = () => {
  //TODO: get detail in clientState etc No. of items

  const ShippingAndBilling = () => {
    return (
      <>
        <Spacing margin="0 0 8px 0">
          <h2>Shipping & Billing</h2>
        </Spacing>
        <Payment />
      </>
    );
  };

  const OrderSummary = () => {
    return (
      <>
        <Spacing margin="0 0 8px 0">
          <h2>Order Summary</h2>
          <ul>
            <li>Subtotal ( 999 Items)</li>
            <li>Shipping fee ( 999 Items)</li>
          </ul>
        </Spacing>
      </>
    );
  };

  return (
    <Container>
      <Spacing margin="2rem 0">
        <Row>
          <Col span={16}>
            <h1>Summary</h1>
            <ul>
              <li>Items</li>
              <li>Items</li>
              <li>Items</li>
              <li>Items</li>
              <li>Items</li>
              <li>Items</li>
              <li>Items</li>
              <li>Items</li>
            </ul>
          </Col>
          <Col span={8}>
            <Card>
              <OrderSummary />
              <ShippingAndBilling />
            </Card>
          </Col>
        </Row>
      </Spacing>
    </Container>
  );
};

export default Checkout;
