import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedService from '../components/FeaturedService';
import MeetOurPartners from '../components/MeetOurPartners';
import Contact from '../components/Contact';

const Home = () => {
  useEffect(()=>{
    document.title= "Service Review"
  }, [])
  return (
    <div>
      <Hero/>
      <About/>
      <FeaturedService/>
      <MeetOurPartners/>
      <Contact/>
    </div>
  );
};

export default Home;