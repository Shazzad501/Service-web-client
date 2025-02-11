import React from 'react';
import logo from "../assets/logo.png"
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-black text-neutral-content p-10">
  <aside>
    <img 
    className='w-24 h-12'
    src={logo} alt="Logo" />
    <p className='font-bold text-xl'>
      Service Providerer Ltd.
    </p>
    <p className='font-bold text-sm'>
      Copyright © {new Date().getFullYear()} - All right reserved by Maruf</p>
  </aside>
  <nav>
    <h6 className="footer-title">Social</h6>
    <div className="grid grid-flow-col gap-4">
      <Link 
      className='font-bold text-xl text-white'
      to='https://www.facebook.com/' 
      target="_blank"><FaFacebook/></Link>

      <Link 
      className='font-bold text-xl text-white'
      to='https://x.com/home' 
      target="_blank"><FaTwitter/></Link>

      <Link 
      className='font-bold text-xl text-white'
      to='https://www.instagram.com/' 
      target="_blank"><FaInstagram/></Link>
    </div>
  </nav>
</footer>
    </div>
  );
};

export default Footer;