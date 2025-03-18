
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock booking data
const bookings = [
  {
    id: 'BK00123',
    guestName: 'John Smith',
    roomType: 'Deluxe Room',
    checkIn: '2023-08-10',
    checkOut: '2023-08-15',
    status: 'Confirmed',
    amount: 750,
  },
  {
    id: 'BK00124',
    guestName: 'Emma Johnson',
    roomType: 'Standard Room',
    checkIn: '2023-08-12',
    checkOut: '2023-08-14',
    status: 'Confirmed',
    amount: 200,
  },
  {
    id: 'BK00125',
    guestName: 'Michael Brown',
    roomType: 'Family Suite',
    checkIn: '2023-08-15',
    checkOut: '2023-08-20',
    status: 'Pending',
    amount: 1100,
  },
  {
    id: 'BK00126',
    guestName: 'Sarah Davis',
    roomType: 'Executive Suite',
    checkIn: '2023-08-18',
    checkOut: '2023-08-21',
    status: 'Confirmed',
    amount: 900,
  },
  {
    id: 'BK00127',
    guestName: 'Robert Wilson',
    roomType: 'Standard Room',
    checkIn: '2023-08-20',
    checkOut: '2023-08-22',
    status: 'Cancelled',
    amount: 200,
  },
];

// Mock room data
const rooms = [
  {
    id: 101,
    type: 'Standard Room',
    status: 'Occupied',
    guest: 'John Smith',
    checkOut: '2023-08-15',
  },
  {
    id: 102,
    type: 'Standard Room',
    status: 'Available',
    guest: null,
    checkOut: null,
  },
  {
    id: 201,
    type: 'Deluxe Room',
    status: 'Available',
    guest: null,
    checkOut: null,
  },
  {
    id: 202,
    type: 'Deluxe Room',
    status: 'Occupied',
    guest: 'Sarah Davis',
    checkOut: '2023-08-21',
  },
  {
    id: 301,
    type: 'Family Suite',
    status: 'Maintenance',
    guest: null,
    checkOut: null,
  },
  {
    id: 401,
    type: 'Executive Suite',
    status: 'Reserved',
    guest: 'Michael Brown',
    checkOut: '2023-08-20',
  },
];

const AdminDashboard = () => {
  const { toast } = useToast();

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    toast({
      title: 'Status Updated',
      description: `Booking ${bookingId} status changed to ${newStatus}`,
    });
  };

  const handleRoomStatusChange = (roomId: number, newStatus: string) => {
    toast({
      title: 'Room Status Updated',
      description: `Room ${roomId} status changed to ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Hotel Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Bookings</CardTitle>
              <CardDescription>Current month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">156</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Occupancy Rate</CardTitle>
              <CardDescription>Current status</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">78%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue</CardTitle>
              <CardDescription>Current month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$24,560</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="bookings" className="mt-6">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  Manage and view all booking details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room Type</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.guestName}</TableCell>
                        <TableCell>{booking.roomType}</TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>${booking.amount}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleStatusChange(booking.id, 'Confirmed')}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View All Bookings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="rooms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Room Status</CardTitle>
                <CardDescription>
                  Monitor and manage room availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Current Guest</TableHead>
                      <TableHead>Check-out Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.id}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            room.status === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : room.status === 'Occupied'
                                ? 'bg-blue-100 text-blue-800'
                                : room.status === 'Maintenance'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {room.status}
                          </span>
                        </TableCell>
                        <TableCell>{room.guest || '-'}</TableCell>
                        <TableCell>{room.checkOut || '-'}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleRoomStatusChange(room.id, 'Available')}>
                              Change Status
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Manage All Rooms</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="guests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Guest Management</CardTitle>
                <CardDescription>
                  View and manage guest information
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                Guest management interface would appear here
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
