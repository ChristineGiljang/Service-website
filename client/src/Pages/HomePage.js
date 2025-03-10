import React from 'react';
import Header from '../components/Header';
import ServiceCategories from '../components/ServiceCategories';
import HeroContainer from '../components/HeroContainer'

const HomePage = () => {
  return (
    <div>
      <HeroContainer />
      <ServiceCategories />
    </div>
  );
};

export default HomePage;
