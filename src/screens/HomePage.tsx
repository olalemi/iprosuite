import React from 'react';
import bg from '../assets/pattern-dark.png';

const HomePage = () => {
  return (
    <div 
      style={{ backgroundImage: `url(${bg})` }} 
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
    >
      <div className="text-white text-4xl">HomePage</div>
    </div>
  );
}

export default HomePage;
