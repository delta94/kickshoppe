/**
 * Bag
 */

import React from 'react';
import { Row, Card } from 'antd';
import Col from 'components/Col';
import Container from 'components/Container';
import { BagProps } from './interface';

export const Bag: React.FC<BagProps> = () => {
  return (
    <Container>
      <Row>
        <Col span={12}>
          <Card>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel mollitia modi cupiditate
            enim perspiciatis itaque sequi esse molestiae aperiam obcaecati?
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel mollitia modi cupiditate
            enim perspiciatis itaque sequi esse molestiae aperiam obcaecati?
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Bag;
