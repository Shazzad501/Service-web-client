import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <nav>

      </nav>
      <main className='max-w-7xl mx-auto'>
        <Outlet></Outlet>
      </main>
      <footer>
        {/* 
        apiKey: "AIzaSyCsjzl5OpvckQekjlr2cWGqb9UJe-HtB7U",
  authDomain: "service-review-5ac25.firebaseapp.com",
  projectId: "service-review-5ac25",
  storageBucket: "service-review-5ac25.firebasestorage.app",
  messagingSenderId: "1041354534602",
  appId: "1:1041354534602:web:902a72ed8ed6ad22910e33"
        */}
      </footer>
    </div>
  );
};

export default MainLayout;