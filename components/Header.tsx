
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
        Jadugar
      </h1>
      <p className="mt-2 text-lg text-slate-300">Your AI Image Wizard</p>
    </header>
  );
};

export default Header;
