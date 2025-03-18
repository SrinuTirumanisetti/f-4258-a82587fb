
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10',
        isScrolled 
          ? 'glass shadow-sm border-b border-white/10' 
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight transition-colors duration-300">
            Pristine
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="nav-link">Features</a>
          <a href="#products" className="nav-link">Products</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="btn-primary">Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[76px] bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-300 ease-in-out-expo md:hidden",
          mobileMenuOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-10 pointer-events-none"
        )}
      >
        <nav className="flex flex-col p-6 space-y-5">
          <a 
            href="#features" 
            className="text-lg font-medium px-2 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#products" 
            className="text-lg font-medium px-2 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </a>
          <a 
            href="#about" 
            className="text-lg font-medium px-2 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="text-lg font-medium px-2 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
          <button className="btn-primary w-full mt-4">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
