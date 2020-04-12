import React from 'react';
import { useSpring } from 'react-spring';
import Container from 'components/Container';
import ProductPagination from 'containers/ProductPagination';
import bgImg from 'resources/img/kick-bg.png';
import {
  HomeContainer,
  HeroContainer,
  HeroTitle,
  BgKick,
  backgroundStyle,
  titleStyle,
} from './styled';

const HomePage: React.FC = () => {
  const HeroSection = () => {
    const useBackgroundStyle = useSpring(backgroundStyle);
    const useTitleStyle = useSpring(titleStyle);

    return (
      <HeroContainer>
        <BgKick style={useBackgroundStyle} src={bgImg} alt="hero-img" />
        <HeroTitle style={useTitleStyle}>KickShoppe</HeroTitle>
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

export default HomePage;
