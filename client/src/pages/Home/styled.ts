import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

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

export const backgroundStyle = {
  from: {
    opacity: 0,
    transform: ' translateX(-100px)',
  },
  to: {
    opacity: 1,
    transform: ' translateX(0px)',
  },
};

export const titleStyle = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
  config: { duration: 500 },
};
