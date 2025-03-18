
import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
      
      {/* Background Image - you can replace the placeholder with a hotel image */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" 
        style={{ backgroundImage: 'url(/placeholder.svg)' }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Find Your Perfect Stay
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mb-12">
          Discover amazing deals on hotels, homes, and much more...
        </p>
        
        {/* Search Bar */}
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
