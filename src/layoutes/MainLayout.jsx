import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <nav>

      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>

      </footer>
    </div>
  );
};

export default MainLayout;