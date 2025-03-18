
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Search, CalendarIcon, Users } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface SearchFormProps {
  onSearch?: (searchCriteria: any) => void;
  className?: string;
}

const SearchForm = ({ onSearch, className }: SearchFormProps) => {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState({
    city: '',
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 1
  });

  const handleChange = (field: string, value: any) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchCriteria);
    } else {
      // If no onSearch prop, navigate to hotels page with query params
      navigate(`/hotels?city=${searchCriteria.city}&guests=${searchCriteria.guests}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col md:flex-row gap-4", className)}>
      {/* Destination */}
      <div className="flex-1">
        <Label htmlFor="city" className="sr-only">Destination</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="city"
            placeholder="Where are you going?"
            className="pl-9"
            value={searchCriteria.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
      </div>
      
      {/* Check-in Date */}
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {searchCriteria.checkIn ? (
                format(searchCriteria.checkIn, "PPP")
              ) : (
                <span>Check-in Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={searchCriteria.checkIn || undefined}
              onSelect={(date) => handleChange('checkIn', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Check-out Date */}
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {searchCriteria.checkOut ? (
                format(searchCriteria.checkOut, "PPP")
              ) : (
                <span>Check-out Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={searchCriteria.checkOut || undefined}
              onSelect={(date) => handleChange('checkOut', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Guests */}
      <div>
        <Label htmlFor="guests" className="sr-only">Guests</Label>
        <Select 
          value={searchCriteria.guests.toString()} 
          onValueChange={(value) => handleChange('guests', parseInt(value))}
        >
          <SelectTrigger className="w-[140px]">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Guests" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Search Button */}
      <Button type="submit" className="bg-hotel-500 hover:bg-hotel-600">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
