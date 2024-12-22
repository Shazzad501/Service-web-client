import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <nav>
      <Navbar></Navbar>
      </nav>
      <main className='max-w-7xl mx-auto'>
        <Outlet></Outlet>
      </main>
      <footer>
      </footer>
    </div>
  );
};

export default MainLayout;