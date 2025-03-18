
import React, { useRef, useEffect } from 'react';
import { useScrollAnimation, useMousePosition } from '@/lib/animations';

const Hero = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { ref: mouseRef, position } = useMousePosition();
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Subtle parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      backgroundRef.current.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={mouseRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background elements with parallax effect */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 -z-10 opacity-20"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 mix-blend-multiply blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-purple-200 mix-blend-multiply blur-3xl animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-pink-200 mix-blend-multiply blur-3xl animate-float" style={{animationDelay: '2s'}} />
      </div>

      {/* Content Container */}
      <div 
        ref={sectionRef} 
        className="container px-4 sm:px-6 mx-auto text-center z-10"
      >
        {/* Small tag line with animation */}
        <div 
          className={`inline-block mb-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium tracking-wider uppercase transition-all duration-700 ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          Introducing Pristine
        </div>

        {/* Main headline with animation */}
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 transition-all duration-700 ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Design with <span className="text-gradient bg-gradient-to-r from-blue-500 to-indigo-600">precision</span><br />
          Build with <span className="text-gradient bg-gradient-to-r from-purple-500 to-pink-500">purpose</span>
        </h1>

        {/* Subtitle with animation */}
        <p 
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          Embrace simplicity in design. Create products that are intuitive,
          functional, and beautiful without unnecessary complexity.
        </p>

        {/* CTA buttons with animation */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <button className="btn-primary px-8 py-3">
            Get Started
          </button>
          <button className="text-foreground/80 font-medium hover:text-foreground px-4 py-3 transition duration-300">
            Learn More
          </button>
        </div>

        {/* Decorative arrow pointing down */}
        <div 
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-foreground/40 rounded-full animate-[bounce_2s_infinite]" />
          </div>
        </div>
      </div>

      {/* Interactive element that follows mouse position */}
      <div 
        className="hidden lg:block absolute w-10 h-10 rounded-full mix-blend-difference bg-white pointer-events-none" 
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease',
          opacity: 0.5
        }}
      />
    </section>
  );
};

export default Hero;
