
import React from 'react';
import { useSequentialAnimation } from '@/lib/animations';
import { Utensils, Wifi, Car, Clock, Coffee, Map } from 'lucide-react';

const hotelFeatures = [
  {
    icon: <Wifi className="h-8 w-8" />,
    title: 'Free High-Speed WiFi',
    description: 'Stay connected with complimentary high-speed internet access throughout the hotel.'
  },
  {
    icon: <Utensils className="h-8 w-8" />,
    title: 'Restaurant & Bar',
    description: 'Enjoy delicious meals and refreshing drinks at our on-site restaurant and bar.'
  },
  {
    icon: <Car className="h-8 w-8" />,
    title: 'Free Parking',
    description: 'Convenient and secure parking available for all hotel guests at no additional cost.'
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: '24/7 Reception',
    description: 'Our front desk is staffed around the clock to assist you with any needs or inquiries.'
  },
  {
    icon: <Coffee className="h-8 w-8" />,
    title: 'Breakfast Included',
    description: 'Start your day right with our complimentary breakfast buffet featuring local specialties.'
  },
  {
    icon: <Map className="h-8 w-8" />,
    title: 'Central Location',
    description: 'Ideally situated in the heart of the city with easy access to major attractions and transit.'
  }
];

export const Features = () => {
  const { containerRef, visibleItems } = useSequentialAnimation(hotelFeatures, 150);

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hotel Amenities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enjoy these premium features and services during your stay with us.
          </p>
        </div>

        {/* Features grid */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {hotelFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-700 ease-out-expo ${
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
