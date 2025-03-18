
import React from 'react';
import { useSequentialAnimation } from '@/lib/animations';
import { Layers, Heart, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: <Layers className="h-8 w-8" />,
    title: 'Thoughtful Layers',
    description: 'Each detail carefully considered and precisely placed for maximum impact with minimum effort.'
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Design with Purpose',
    description: 'Form follows function in everything we create, making products that truly enhance experiences.'
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Lightning Performance',
    description: 'Optimized for speed without compromising aesthetics or functionality.'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Human-Centered',
    description: 'Building experiences that feel natural and intuitive, designed for people first.'
  }
];

const Features = () => {
  const { containerRef, visibleItems } = useSequentialAnimation(features, 150);

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Crafted with Precision
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every feature designed with purpose, built with care, and delivered with conviction.
          </p>
        </div>

        {/* Features grid */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card transition-all duration-700 ease-out-expo ${
                visibleItems[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary text-foreground">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
