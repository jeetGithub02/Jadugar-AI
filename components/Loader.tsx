
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-cyan-400 border-r-cyan-400 border-slate-700 animate-spin"></div>
      </div>
      <p className="mt-4 text-slate-300 font-semibold">Jadugar is at work...</p>
    </div>
  );
};

export default Loader;
