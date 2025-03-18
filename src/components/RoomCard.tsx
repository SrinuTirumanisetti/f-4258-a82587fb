
import { useState, useEffect } from 'react';
import { Room } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Wifi, Tv, Coffee, Bath, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BookingForm from './BookingForm';

export interface RoomCardProps {
  room: Room;
  hotelId: string;
  onBookRoom?: (roomId: string) => void;
}

const RoomCard = ({ room, hotelId, onBookRoom }: RoomCardProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<number | null>(null);
  const [dynamicPrice, setDynamicPrice] = useState(room.price);
  const navigate = useNavigate();
  const { state } = useAuth();
  const { isAuthenticated } = state;
  
  // Calculate dynamic price based on the number of guests
  useEffect(() => {
    const searchGuests = Number(localStorage.getItem('searchGuests') || '1');
    const maxRoomCapacity = room.maxPeople;
    
    let calculatedPrice = room.price;
    // If guests exceeds room capacity but is within double capacity, double the price
    if (searchGuests > maxRoomCapacity && searchGuests <= maxRoomCapacity * 2) {
      calculatedPrice = room.price * 2;
    }
    // If guests exceeds double capacity, show room as unavailable or suggest multiple rooms
    
    setDynamicPrice(calculatedPrice);
  }, [room.price, room.maxPeople]);
  
  const handleBookRoom = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to book a room");
      navigate('/login');
      return;
    }
    
    // If the room has no available room numbers, show error
    if (room.roomNumbers.length === 0) {
      toast.error("No rooms available for booking");
      return;
    }
    
    setIsBooking(true);
    
    // If onBookRoom prop is provided, use it
    if (onBookRoom) {
      onBookRoom(room._id || '');
      return;
    }
    
    // Pick the first available room number
    setSelectedRoomNumber(room.roomNumbers[0].number);
    setShowBookingForm(true);
    setIsBooking(false);
  };
  
  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedRoomNumber(null);
  };
  
  // Get search criteria from localStorage for date check
  const getSearchDates = () => {
    try {
      const savedCriteria = localStorage.getItem('searchCriteria');
      if (savedCriteria) {
        const parsed = JSON.parse(savedCriteria);
        return {
          checkIn: parsed.checkIn ? new Date(parsed.checkIn) : null,
          checkOut: parsed.checkOut ? new Date(parsed.checkOut) : null
        };
      }
    } catch (error) {
      console.error("Error parsing saved search criteria:", error);
    }
    return { checkIn: null, checkOut: null };
  };
  
  return (
    <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-all">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Room Image */}
        <div className="aspect-video md:aspect-square bg-muted overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-hotel-100">
            <span className="text-hotel-500 font-medium">{room.title}</span>
          </div>
        </div>
        
        {/* Room Info */}
        <div className="p-4 md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">{room.title}</h3>
            <Badge variant="outline">{room.title.split(' ')[0]}</Badge>
          </div>
          
          <p className="text-muted-foreground mb-4">{room.desc}</p>
          
          {/* Room Features */}
          <div className="grid grid-cols-2 gap-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-hotel-500" />
              <span>Max {room.maxPeople} {room.maxPeople === 1 ? 'person' : 'people'}</span>
            </div>
            <div className="flex items-center text-sm">
              <Bath className="h-4 w-4 mr-2 text-hotel-500" />
              <span>Private bathroom</span>
            </div>
            <div className="flex items-center text-sm">
              <Wifi className="h-4 w-4 mr-2 text-hotel-500" />
              <span>Free WiFi</span>
            </div>
            <div className="flex items-center text-sm">
              <Tv className="h-4 w-4 mr-2 text-hotel-500" />
              <span>Smart TV</span>
            </div>
            <div className="flex items-center text-sm">
              <Coffee className="h-4 w-4 mr-2 text-hotel-500" />
              <span>Coffee maker</span>
            </div>
            <div className="flex items-center text-sm">
              <Check className="h-4 w-4 mr-2 text-hotel-500" />
              <span>{room.roomNumbers.length} rooms available</span>
            </div>
          </div>
          
          {/* Booking Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-2xl font-bold text-hotel-700">${dynamicPrice}</span>
              <span className="text-muted-foreground ml-1">per night</span>
              {dynamicPrice !== room.price && (
                <p className="text-xs text-hotel-600 mt-1">
                  *Price adjusted based on guest count
                </p>
              )}
            </div>
            <Button
              onClick={handleBookRoom}
              disabled={isBooking || room.roomNumbers.length === 0}
              className="mt-4 sm:mt-0 bg-hotel-500 hover:bg-hotel-600"
            >
              {isBooking ? "Processing..." : "Book Now"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Booking Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedRoomNumber && (
            <BookingForm
              hotel={{ _id: hotelId } as any}
              room={{...room, price: dynamicPrice}}
              roomNumber={selectedRoomNumber}
              checkIn={getSearchDates().checkIn}
              checkOut={getSearchDates().checkOut}
              onClose={handleCloseBookingForm}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomCard;
