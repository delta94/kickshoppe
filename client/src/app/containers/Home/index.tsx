import React from 'react';
import { Row, Card } from 'antd';
import { Title, Subtitle } from 'app/components/Typography';
import { useSpring, animated } from 'react-spring';
import { useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import FullPageLoader from 'app/components/Loaders/FullPageLoader';
import Container from 'app/components/Container';
import Col from 'app/components/Col';
import Spacing from 'app/components/Spacing';
import ProductPagination from 'app/containers/ProductPagination';
import { GET_PRODUCT_PAGINATION } from 'app/containers/ProductPagination/gql';

import bgImg from 'resources/img/kick-bg.png';

const { Meta } = Card;

interface Props {}

const HomeContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const HeroContainer = styled.div`
  position: relative;
  height: 45vh;
  width: 100%;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroTitle = styled(animated.div)`
  position: absolute;
  font-size: 80px;
  bottom: -7rem;
`;

const BgKick = styled(animated.img)`
  height: 100%;
  transform: rotateX(30deg);
`;

const ProductSectionContainer = styled.div`
  padding-top: 10rem;
`;

const Home: React.FC<Props> = () => {
  const HeroSection = () => {
    const bgStyle = useSpring({
      from: {
        opacity: 0,
        transform: 'scale(0.8)',
      },
      to: {
        opacity: 1,
        transform: 'scale(1)',
      },
      config: { duration: 500 },
    });

    const titleStyle = useSpring({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: { duration: 500 },
    });

    return (
      <HeroContainer>
        <BgKick style={bgStyle} src={bgImg} alt="hero-img" />
        <HeroTitle style={titleStyle}>KickShoppe</HeroTitle>
      </HeroContainer>
    );
  };

  return (
    <HomeContainer>
      <HeroSection />
      <Container>
        <ProductPagination />
      </Container>
    </HomeContainer>
  );
};

export default Home;
