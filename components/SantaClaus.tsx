
import React from 'react';

const SantaClaus: React.FC = () => {
  return (
    <div className="fixed bottom-10 right-10 z-50 animate-santa-float group cursor-pointer hidden md:block">
      <div className="relative">
        {/* Simple Santa Illustration using UTF and Divs */}
        <div className="text-8xl drop-shadow-2xl filter group-hover:scale-110 transition-transform duration-300">
          🎅
        </div>
        <div className="absolute -top-10 -left-10 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
          Ho Ho Ho!
        </div>
      </div>
    </div>
  );
};

export default SantaClaus;
