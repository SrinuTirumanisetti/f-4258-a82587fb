
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bed, Wifi, Coffee, Tv, Users, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data - in a real app, this would come from an API
const roomTypes = [
  {
    id: 1,
    className: 'Standard Room',
    basePrice: 100,
    description: 'Our Standard Rooms offer comfort and convenience for the discerning traveler. Each room features modern décor, plush bedding, and all essential amenities to ensure a pleasant stay. Perfect for solo travelers or couples seeking quality accommodation without the premium price tag.',
    longDescription: `
      Discover the perfect balance of comfort and value in our Standard Rooms. These well-appointed accommodations offer everything you need for a relaxing stay, whether you're visiting for business or leisure.
      
      Each Standard Room features a comfortable queen-size bed with premium linens, ensuring a restful night's sleep. The private bathroom includes a shower with complimentary toiletries, while a work desk provides convenience for business travelers.
      
      Enjoy modern technology with free high-speed WiFi, a 40-inch flat-screen TV with cable channels, and convenient charging ports for your devices. Climate control lets you set your perfect temperature, and blackout curtains ensure you can sleep soundly any time of day.
      
      Our Standard Rooms strike the ideal balance between comfort and value, making them a popular choice for travelers who appreciate quality without unnecessary extras.
    `,
    features: ['Free WiFi', 'TV', 'Air Conditioning', 'Work Desk', 'Daily Housekeeping', 'Shower', 'Hairdryer'],
    bedTypes: [{ name: 'Queen Bed', count: 1 }],
    maxOccupancy: 2,
    roomSize: '24m²',
    image: '/placeholder.svg',
    additionalImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      smoking: 'No smoking',
      pets: 'No pets allowed'
    }
  },
  {
    id: 2,
    className: 'Deluxe Room',
    basePrice: 150,
    description: 'Spacious room with premium amenities and city view.',
    longDescription: `
      Elevate your stay with our Deluxe Rooms, offering additional space and enhanced amenities for the discerning traveler. These elegantly appointed rooms feature stylish décor and premium furnishings to ensure maximum comfort throughout your stay.
      
      Each Deluxe Room boasts a luxurious king-size bed dressed in high-thread-count linens and a selection of pillows. The spacious bathroom includes both a rainfall shower and a deep soaking tub, perfect for unwinding after a busy day.
      
      Enjoy sweeping city views through floor-to-ceiling windows, filling the room with natural light during the day. For entertainment, a 55-inch smart TV provides access to streaming services, while a Bluetooth speaker system allows you to enjoy your favorite music.
      
      Additional premium features include a well-stocked minibar, Nespresso coffee machine, and a comfortable seating area where you can relax or catch up on work. Experience the perfect blend of style, comfort, and functionality in our popular Deluxe Rooms.
    `,
    features: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Coffee Maker', 'City View', 'King Bed', 'Bathtub & Shower', 'Bathrobe & Slippers'],
    bedTypes: [{ name: 'King Bed', count: 1 }],
    maxOccupancy: 2,
    roomSize: '32m²',
    image: '/placeholder.svg',
    additionalImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 48 hours before check-in',
      smoking: 'No smoking',
      pets: 'No pets allowed'
    }
  },
];

const RoomDetail = () => {
  const { id } = useParams();
  const room = roomTypes.find(room => room.id === Number(id));

  if (!room) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Room not found</h1>
          <p className="mt-4">The room you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="mt-6">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to All Rooms
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={room.image} 
                alt={room.className} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              {room.additionalImages.map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${room.className} view ${idx + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
            
            <Tabs defaultValue="description" className="mt-8">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {room.longDescription.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-muted-foreground">{paragraph}</p>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <Bed className="w-5 h-5 text-primary" />
                        <span>
                          {room.bedTypes.map(bed => `${bed.count} ${bed.name}`).join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span>Max {room.maxOccupancy} guests</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {room.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="policies" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Check-in</TableCell>
                          <TableCell>{room.policies.checkIn}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Check-out</TableCell>
                          <TableCell>{room.policies.checkOut}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Cancellation</TableCell>
                          <TableCell>{room.policies.cancellation}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Smoking</TableCell>
                          <TableCell>{room.policies.smoking}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pets</TableCell>
                          <TableCell>{room.policies.pets}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{room.className}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">${room.basePrice}</span>
                    <span className="text-sm">/night</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Room Size:</span>
                  <span className="font-medium">{room.roomSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Max Occupancy:</span>
                  <span className="font-medium">{room.maxOccupancy} guests</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Bed Type:</span>
                  <span className="font-medium">
                    {room.bedTypes.map(bed => `${bed.count} ${bed.name}`).join(', ')}
                  </span>
                </div>
                
                <div className="py-2 border-t border-b">
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {room.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Button className="w-full">Book Now</Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Rates include taxes and fees. No prepayment needed – pay at the property.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomDetail;
