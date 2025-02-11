import Lottie from 'react-lottie-player';
import aboutLotti from '../assets/about.json'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    // Initialize AOS animation
    AOS.init({
      duration: 1500,
    });
  }, []);
  return (
    <div className='bg-base-200'>
    <div className='flex flex-col-reverse gap-5 md:flex-row py-10 mt-7 max-w-7xl mx-auto px-5'>
      <div data-aos='zoom-in' className='w-full md:w-1/2'>
      <Lottie
            loop
            animationData={aboutLotti}
            play
            className="w-full h-full"
            />
      </div>
      <div data-aos='zoom-in' className='w-full md:w-1/2'>
      <h2 className='font-extrabold text-4xl text-purple-800'>About <span className='text-black'>Us</span></h2>
      <p className='font-bold text-lg mt-5 text-gray-600'>Welcome to our site, where convenience meets excellence. Our mission is to simplify your life by providing reliable and efficient delivery, ride-share, or other services. With a commitment to quality and customer satisfaction, we aim to set new standards in site. Whether you need Ride Shear: a fast ride, a secure delivery, or personalized support, our team is dedicated to ensuring your experience is seamless and hassle-free.</p>
    <Link to={'/services'} className='btn bg-purple-800 hover:bg-purple-800 rounded-xl rounded-br-none text-lg text-white font-bold mt-10'>See Services</Link>
      </div>
    </div>
    </div>
  );
};

export default About;