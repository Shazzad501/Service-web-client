import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedService from '../components/FeaturedService';

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <FeaturedService/>
    </div>
  );
};

export default Home;