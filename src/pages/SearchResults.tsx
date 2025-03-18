
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Calendar, Users, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { roomTypes } from '../components/RoomTypes';
import SearchBar from '../components/SearchBar';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkIn = searchParams.get('checkIn') 
    ? new Date(searchParams.get('checkIn') as string) 
    : null;
  const checkOut = searchParams.get('checkOut') 
    ? new Date(searchParams.get('checkOut') as string) 
    : null;
  const adults = parseInt(searchParams.get('adults') || '1');
  const children = parseInt(searchParams.get('children') || '0');

  const totalGuests = adults + children;
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  // Filter rooms that can accommodate the number of guests
  // In a real application, this would be fetched from the backend
  const filteredRooms = roomTypes.filter(room => {
    // Calculate max capacity based on beds
    const capacity = room.bedTypes.reduce((sum, bed) => {
      if (bed.name.includes('King')) return sum + (2 * bed.count);
      if (bed.name.includes('Queen')) return sum + (2 * bed.count);
      return sum + bed.count; // Single beds
    }, 0);
    
    return capacity >= totalGuests;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="py-6 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SearchBar />
        </div>
      </div>
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {filteredRooms.length} available options
            </h1>
            {checkIn && checkOut && (
              <div className="flex items-center text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {format(checkIn, 'PPP')} - {format(checkOut, 'PPP')} · {nights} night{nights !== 1 ? 's' : ''}
                </span>
                <span className="mx-2">·</span>
                <Users className="h-4 w-4 mr-1" />
                <span>{totalGuests} guest{totalGuests !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={room.image} 
                      alt={room.className} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h2 className="text-xl font-semibold">{room.className}</h2>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>City center</span>
                          <div className="flex items-center ml-3">
                            <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                            <span>4.8 (120 reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                        <Star className="h-3 w-3 mr-1 fill-primary" />
                        Top Rated
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.map((feature, i) => (
                        <span key={i} className="bg-secondary/30 px-2 py-1 rounded-md text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex justify-between items-end">
                      <div>
                        <div className="text-2xl font-bold">
                          ${room.basePrice * nights}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${room.basePrice} per night · {nights} night{nights !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <Button 
                        onClick={() => navigate(`/rooms/${room.id}?checkIn=${searchParams.get('checkIn')}&checkOut=${searchParams.get('checkOut')}&adults=${adults}&children=${children}`)}
                      >
                        Select Room
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredRooms.length === 0 && (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">No rooms available</h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or dates
                </p>
                <Button onClick={() => navigate('/')}>
                  Return to Home
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
