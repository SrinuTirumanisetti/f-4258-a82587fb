import axios from 'axios';
import { mockServices } from './mockData';

// Create an axios instance with the base URL
const API_URL = 'http://localhost:8000/api';

// Flag to determine if we should use mock data
let useMockData = false;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add a request interceptor to add the authorization token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.code === 'ERR_NETWORK') {
    console.error('Network error: Cannot connect to the backend server');
    // Set mock mode to true when we can't connect to the backend
    useMockData = true;
    return { 
      error: true,
      message: 'Cannot connect to the server. Using mock data instead.',
      useMockData: true
    };
  }
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return { 
      error: true,
      message: error.response.data?.message || 'Server error',
      status: error.response.status
    };
  } else if (error.request) {
    // The request was made but no response was received
    // Set mock mode to true
    useMockData = true;
    return { 
      error: true,
      message: 'No response from server. Using mock data instead.',
      useMockData: true
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { 
      error: true,
      message: error.message || 'An unknown error occurred',
    };
  }
};

// Function to set mock mode
export const setMockMode = (mode) => {
  useMockData = mode;
  localStorage.setItem('useMockData', mode.toString());
  return useMockData;
};

// Check if mock mode is enabled in localStorage
export const initMockMode = () => {
  const mockMode = localStorage.getItem('useMockData');
  if (mockMode === 'true') {
    useMockData = true;
  }
  return useMockData;
};

// Initialize mock mode
initMockMode();

// Authentication with redirect to homepage on logout
export const authAPI = {
  login: async (email, password) => {
    try {
      if (useMockData) {
        // Mock successful login
        const token = 'mock-jwt-token';
        localStorage.setItem('token', token);
        return {
          user: {
            _id: 'user123',
            username: 'mockuser',
            email: email,
            country: 'USA',
            city: 'New York',
            phone: '+1234567890',
            isAdmin: email.includes('admin'),
            isModerator: email.includes('moderator')
          },
          token
        };
      }
      
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  register: async (userData) => {
    try {
      if (useMockData) {
        // Mock successful registration
        return {
          user: {
            _id: 'user123',
            username: userData.username,
            email: userData.email,
            country: userData.country,
            city: userData.city,
            isAdmin: false,
            isModerator: false
          },
          message: 'Registration successful!'
        };
      }
      
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    // Redirect to homepage when logging out
    window.location.href = '/';
  },
  getCurrentUser: async () => {
    try {
      if (useMockData) {
        // Mock current user
        return {
          _id: 'user123',
          username: 'mockuser',
          email: 'user@example.com',
          country: 'USA',
          city: 'New York',
          phone: '+1234567890',
          isAdmin: false,
          isModerator: false
        };
      }
      
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Workers API
export const workerAPI = {
  getAllWorkers: async () => {
    try {
      if (useMockData) {
        return [
          {
            _id: 'worker1',
            name: 'John Cleaner',
            userId: 'user1',
            hotelId: 'hotel1',
            role: 'Housekeeper',
            email: 'john@example.com',
            phone: '+12345678901',
            isActive: true,
            assignedRooms: []
          }
        ];
      }
      
      const response = await api.get('/workers');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getWorkerById: async (id) => {
    try {
      const response = await api.get(`/workers/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  createWorker: async (workerData) => {
    try {
      const response = await api.post('/workers', workerData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  updateWorker: async (id, workerData) => {
    try {
      const response = await api.put(`/workers/${id}`, workerData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  deleteWorker: async (id) => {
    try {
      const response = await api.delete(`/workers/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  markRoomAsCleaned: async (workerId, roomId) => {
    try {
      const response = await api.put(`/workers/${workerId}/rooms/${roomId}/clean`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Moderators
export const moderatorAPI = {
  getAllModerators: async () => {
    try {
      if (useMockData) {
        return [
          {
            _id: 'mod1',
            userId: 'user123',
            hotelId: 'hotel1',
            isActive: true,
            permissions: {
              canManageWorkers: true,
              canManageRooms: true,
              canViewBookings: true
            },
            assignedHotels: ['hotel1']
          }
        ];
      }
      
      const response = await api.get('/moderators');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getModeratorById: async (id) => {
    try {
      const response = await api.get(`/moderators/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  createModerator: async (moderatorData) => {
    try {
      const response = await api.post('/moderators', moderatorData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  updateModerator: async (id, moderatorData) => {
    try {
      const response = await api.put(`/moderators/${id}`, moderatorData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  deleteModerator: async (id) => {
    try {
      const response = await api.delete(`/moderators/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Hotels with enhanced search and price filtering
export const hotelAPI = {
  getAllHotels: async () => {
    try {
      if (useMockData) {
        return [
          {
            _id: 'hotel1',
            name: 'Grand Hotel',
            type: 'Hotel',
            city: 'New York',
            address: '123 Broadway',
            distance: '0.5 km from center',
            photos: ['https://example.com/hotel1.jpg'],
            title: 'Luxury Stay in Downtown',
            desc: 'Experience luxury in the heart of the city',
            rating: 4.5,
            rooms: ['room1', 'room2'],
            cheapestPrice: 199,
            featured: true
          }
        ];
      }
      
      const response = await api.get('/hotels');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  searchHotels: async (criteria) => {
    try {
      if (useMockData) {
        // Filter mock hotels based on criteria
        const mockHotels = [
          {
            _id: 'hotel1',
            name: 'Grand Hotel',
            type: 'Hotel',
            city: 'New York',
            address: '123 Broadway',
            distance: '0.5 km from center',
            photos: ['https://example.com/hotel1.jpg'],
            title: 'Luxury Stay in Downtown',
            desc: 'Experience luxury in the heart of the city',
            rating: 4.5,
            rooms: ['room1', 'room2'],
            cheapestPrice: 199,
            featured: true
          },
          {
            _id: 'hotel2',
            name: 'Beach Resort',
            type: 'Resort',
            city: 'Miami',
            address: '456 Ocean Drive',
            distance: '0.2 km from beach',
            photos: ['https://example.com/hotel2.jpg'],
            title: 'Relaxing Beach Getaway',
            desc: 'Enjoy the sun and sand just steps away',
            rating: 4.8,
            rooms: ['room3', 'room4'],
            cheapestPrice: 299,
            featured: true
          }
        ];
        
        let results = [...mockHotels];
        
        // Filter by city
        if (criteria.city) {
          results = results.filter(hotel => 
            hotel.city.toLowerCase().includes(criteria.city.toLowerCase())
          );
        }
        
        // Filter by price range
        if (criteria.priceRange && criteria.priceRange.length === 2) {
          const [min, max] = criteria.priceRange;
          results = results.filter(hotel => 
            hotel.cheapestPrice >= min && hotel.cheapestPrice <= max
          );
        }
        
        // Store search criteria in localStorage for dynamic pricing
        if (criteria.guests) {
          localStorage.setItem('searchGuests', criteria.guests.toString());
        }
        
        return results;
      }
      
      const response = await api.post('/hotels/search', criteria);
      
      // Store search criteria in localStorage for dynamic pricing
      if (criteria.guests) {
        localStorage.setItem('searchGuests', criteria.guests.toString());
      }
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getFeaturedHotels: async () => {
    try {
      const response = await api.get('/hotels/featured');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  createHotel: async (hotelData) => {
    try {
      const response = await api.post('/hotels', hotelData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  updateHotel: async (id, hotelData) => {
    try {
      const response = await api.put(`/hotels/${id}`, hotelData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  deleteHotel: async (id) => {
    try {
      const response = await api.delete(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Rooms with enhanced booking functionality
export const roomAPI = {
  getRoomsForHotel: async (hotelId) => {
    try {
      if (useMockData) {
        return [
          {
            _id: 'room1',
            title: 'Deluxe Double Room',
            price: 199,
            maxPeople: 2,
            desc: 'Spacious room with king-size bed',
            roomNumbers: [
              { number: 101, unavailableDates: [] },
              { number: 102, unavailableDates: [] }
            ],
            isCleaned: true,
            needsCleaning: false
          },
          {
            _id: 'room2',
            title: 'Family Suite',
            price: 299,
            maxPeople: 4,
            desc: 'Perfect for families with children',
            roomNumbers: [
              { number: 201, unavailableDates: [] },
              { number: 202, unavailableDates: [] }
            ],
            isCleaned: true,
            needsCleaning: false
          }
        ];
      }
      
      const response = await api.get(`/rooms/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getRoomById: async (id) => {
    try {
      const response = await api.get(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  createRoom: async (hotelId, roomData) => {
    try {
      const response = await api.post(`/rooms/${hotelId}`, roomData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  updateRoom: async (id, roomData) => {
    try {
      const response = await api.put(`/rooms/${id}`, roomData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  deleteRoom: async (id, hotelId) => {
    try {
      const response = await api.delete(`/rooms/${id}/${hotelId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  checkRoomAvailability: async (roomId, dateStart, dateEnd) => {
    try {
      const response = await api.get(`/rooms/availability/${roomId}`, {
        params: { dateStart, dateEnd },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  toggleRoomCleaningStatus: async (roomId, isCleaned) => {
    try {
      const response = await api.put(`/rooms/${roomId}`, { 
        isCleaned,
        needsCleaning: !isCleaned
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Bookings with cancellation functionality
export const bookingAPI = {
  getUserBookings: async (userId) => {
    try {
      if (useMockData) {
        return await mockServices.getUserBookings(userId);
      }
      
      const response = await api.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      if (apiError.useMockData) {
        // If we're switching to mock mode due to an error, return mock data
        return await mockServices.getUserBookings(userId);
      }
      throw apiError;
    }
  },
  createBooking: async (bookingData) => {
    try {
      if (useMockData) {
        // Mock creating a booking
        return {
          _id: 'new-booking-id',
          ...bookingData,
          status: 'confirmed',
          createdAt: new Date()
        };
      }
      
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  cancelBooking: async (id) => {
    try {
      if (useMockData) {
        return await mockServices.cancelBooking(id);
      }
      
      const response = await api.put(`/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      if (apiError.useMockData) {
        // If we're switching to mock mode due to an error, use mock cancel
        return await mockServices.cancelBooking(id);
      }
      throw apiError;
    }
  },
  getAllBookings: async (hotelId) => {
    try {
      const url = hotelId ? `/bookings/hotel/${hotelId}` : '/bookings';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getBookingReceipt: async (id) => {
    try {
      const response = await api.get(`/bookings/${id}/receipt`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  updateBooking: async (id, bookingData) => {
    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  deleteBooking: async (id) => {
    try {
      const response = await api.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getBookingById: async (id) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Users
export const userAPI = {
  getUserById: async (id) => {
    try {
      if (useMockData) {
        return {
          _id: id,
          username: 'mockuser',
          email: 'user@example.com',
          country: 'USA',
          city: 'New York',
          phone: '+1234567890',
          isAdmin: id === 'admin123',
          isModerator: id === 'mod123'
        };
      }
      
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Check if the backend is available
export const checkBackendConnection = async () => {
  try {
    await api.get('/health-check', { timeout: 3000 });
    // If successful, set mock mode to false
    setMockMode(false);
    return true;
  } catch (error) {
    console.error('Backend connection check failed:', error);
    // If failed, set mock mode to true
    setMockMode(true);
    return false;
  }
};

export default api;
