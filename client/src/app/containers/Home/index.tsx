import React from 'react';
import { useSpring } from 'react-spring';
import Container from 'app/components/Container';
import ProductPagination from 'app/containers/ProductPagination';
import bgImg from 'resources/img/kick-bg.png';
import { HomeContainer, HeroContainer, HeroTitle, BgKick } from './styled';

interface Props {}

const Home: React.FC<Props> = () => {
  const HeroSection = () => {
    const bgStyle = useSpring({
      from: {
        opacity: 0,
        transform: ' translateX(-100px)',
      },
      to: {
        opacity: 1,
        transform: ' translateX(0px)',
      },
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
