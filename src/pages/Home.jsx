import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedService from '../components/FeaturedService';
import MeetOurPartners from '../components/MeetOurPartners';
import Testimonial from '../components/Testimonial';

const Home = () => {
  useEffect(()=>{
    document.title= "Service Provider"
  }, [])
  return (
    <div>
      <Hero/>
      <About/>
      <FeaturedService/>
      <MeetOurPartners/>
      <Testimonial/>
    </div>
  );
};

export default Home;