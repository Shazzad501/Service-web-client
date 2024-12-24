import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <nav className='sticky top-0 left-0 right-0 z-50 bg-base-200'>
      <Navbar></Navbar>
      </nav>
      <main className='min-h-screen'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;