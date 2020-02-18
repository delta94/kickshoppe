import styled from 'styled-components';
import { animated } from 'react-spring';

export const HomeContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

export const HeroContainer = styled.div`
  position: relative;
  height: 30vh;
  width: 100%;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeroTitle = styled(animated.div)`
  position: absolute;
  font-size: 80px;
  bottom: -7rem;
`;

export const BgKick = styled(animated.img)`
  height: 100%;
  transform: rotateX(30deg);
`;
