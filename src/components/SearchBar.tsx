
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, Users, Search } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const searchFormSchema = z.object({
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  checkOut: z.date({
    required_error: "Check-out date is required",
  }).refine(
    (date, ctx) => {
      const checkIn = ctx.parent.checkIn;
      return date > checkIn;
    },
    {
      message: "Check-out date must be after check-in date",
    }
  ),
  adults: z.number().min(1, "At least 1 adult is required").max(10),
  children: z.number().min(0).max(10),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const SearchBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const defaultValues: Partial<SearchFormValues> = {
    adults: 1,
    children: 0,
  };

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });

  function onSubmit(data: SearchFormValues) {
    // In a real application, this would navigate to a search results page with query params
    console.log('Search data:', data);
    
    // Generate query params for search
    const params = new URLSearchParams({
      checkIn: data.checkIn.toISOString(),
      checkOut: data.checkOut.toISOString(),
      adults: data.adults.toString(),
      children: data.children.toString(),
    });
    
    // Navigate to search results
    toast({
      title: "Searching for rooms",
      description: `${format(data.checkIn, 'PPP')} to ${format(data.checkOut, 'PPP')} · ${data.adults + data.children} guests`,
    });
    
    // For now, just redirect to the rooms page
    navigate(`/search?${params.toString()}`);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-0">
          <div className="flex flex-col md:flex-row items-end gap-2 p-4">
            {/* Check-in Date */}
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem className="flex-1 space-y-1">
                  <FormLabel className="text-xs font-medium text-muted-foreground">Check-in</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12 border-2 pl-3",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Check-out Date */}
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem className="flex-1 space-y-1">
                  <FormLabel className="text-xs font-medium text-muted-foreground">Check-out</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12 border-2 pl-3",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const checkIn = form.getValues().checkIn;
                          return date < new Date() || (checkIn && date <= checkIn);
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guests */}
            <div className="flex flex-1 gap-2">
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-1">
                    <FormLabel className="text-xs font-medium text-muted-foreground">Adults</FormLabel>
                    <FormControl>
                      <div className="flex items-center border-2 rounded-md h-12 px-3">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          type="number"
                          className="border-0 p-0 h-full focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-1">
                    <FormLabel className="text-xs font-medium text-muted-foreground">Children</FormLabel>
                    <FormControl>
                      <div className="flex items-center border-2 rounded-md h-12 px-3">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          type="number"
                          className="border-0 p-0 h-full focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Search Button */}
            <Button type="submit" size="lg" className="w-full md:w-auto h-12 px-8">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default SearchBar;
