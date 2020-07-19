/**
 * Bag
 */

import React from 'react';
import { Col, Row, Card } from 'antd';
import Container from 'components/Container';
import Spacing from 'components/Spacing';
import { BagProps } from './interface';

/**
 * TODO:
 * - Show the list of items
 * - Should be able to select tiem for checkout
 * - Should able to toggle the number of items quantity
 * - Summary show eaxh item accumulate item prices
 * - Sumaeey should have checkout button to redirect to checout page
 */

// _id: '5e8aced30bf9021922dd4dc1';
// brand: 'adidas';
// colorway: null;
// desc: 'adidas-Yeezy-Boost-350-V2-Cinder';
// gender: 'men';
// image: 'https://stockx.imgix.net/adidas-Yeezy-Boost-350-V2-Cinder_01.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1585357645';
// name: 'Cinder';
// productCategory: 'sneakers';
// releaseDate: '2020-03-21 23:59:59';
// retail: 220;
// shoe: 'adidas Yeezy Boost 350 V2';
// title: 'adidas Yeezy Boost 350 V2 Cinder';

export const Bag: React.FC<BagProps> = () => {
  return (
    <Spacing margin="2rem 0 0">
      <Container>
        <Row gutter={16}>
          <Col span={16}>
            <Card>
              <ul>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit!</li>
              </ul>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel mollitia modi cupiditate
              enim perspiciatis itaque sequi esse molestiae aperiam obcaecati?
            </Card>
          </Col>
        </Row>
      </Container>
    </Spacing>
  );
};

export default Bag;
