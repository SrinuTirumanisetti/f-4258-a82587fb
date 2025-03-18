
import React from 'react';
import { useSequentialAnimation } from '@/lib/animations';
import { Bed, Wifi, Coffee, Tv } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const roomTypes = [
  {
    id: 1,
    className: 'Standard Room',
    basePrice: 100,
    description: 'Comfortable room with all basic amenities.',
    features: ['Free WiFi', 'TV', 'Air Conditioning'],
    bedTypes: [{ name: 'Queen Bed', count: 1 }],
    image: '/placeholder.svg',
  },
  {
    id: 2,
    className: 'Deluxe Room',
    basePrice: 150,
    description: 'Spacious room with premium amenities and city view.',
    features: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Coffee Maker'],
    bedTypes: [{ name: 'King Bed', count: 1 }],
    image: '/placeholder.svg',
  },
  {
    id: 3,
    className: 'Family Suite',
    basePrice: 220,
    description: 'Perfect for families with separate living area.',
    features: ['Free WiFi', 'Smart TV', 'Kitchen', 'Balcony'],
    bedTypes: [
      { name: 'King Bed', count: 1 },
      { name: 'Single Bed', count: 2 },
    ],
    image: '/placeholder.svg',
  },
  {
    id: 4,
    className: 'Executive Suite',
    basePrice: 300,
    description: 'Luxury suite with panoramic views and premium services.',
    features: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Jacuzzi', 'Executive Lounge Access'],
    bedTypes: [{ name: 'Super King Bed', count: 1 }],
    image: '/placeholder.svg',
  },
];

const getFeatureIcon = (feature: string) => {
  if (feature.includes('WiFi')) return <Wifi className="h-4 w-4" />;
  if (feature.includes('TV')) return <Tv className="h-4 w-4" />;
  if (feature.includes('Coffee')) return <Coffee className="h-4 w-4" />;
  return <Bed className="h-4 w-4" />;
};

const RoomTypes = () => {
  const { containerRef, visibleItems } = useSequentialAnimation(roomTypes, 150);
  const navigate = useNavigate();

  return (
    <section id="rooms" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Room Types
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of comfortable and stylish rooms designed to make your stay memorable.
          </p>
        </div>

        {/* Rooms grid */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {roomTypes.map((room, index) => (
            <Card 
              key={room.id}
              className={`transition-all duration-700 ease-out-expo ${
                visibleItems[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img src={room.image} alt={room.className} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{room.className}</CardTitle>
                <CardDescription className="flex items-center">
                  <span className="text-lg font-semibold text-foreground">${room.basePrice}</span>
                  <span className="text-sm ml-1">/ night</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{room.description}</p>
                <div className="text-sm space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {room.bedTypes.map((bed, i) => (
                      <span key={i} className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md text-xs">
                        <Bed className="h-3 w-3" />
                        {bed.count} x {bed.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {room.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded-md text-xs">
                        {getFeatureIcon(feature)}
                        {feature}
                      </span>
                    ))}
                    {room.features.length > 3 && (
                      <span className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded-md text-xs">
                        +{room.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/rooms/${room.id}`)}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomTypes;
