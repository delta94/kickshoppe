import styled from 'styled-components';
import { Col as AntdCol } from 'antd';
import { animated } from 'react-spring';

interface ICol {
  padding?: string;
}

const Col = styled(animated(AntdCol))<ICol>`
  padding: ${p => p.padding && `${p.padding}`};
`;

export default Col;
