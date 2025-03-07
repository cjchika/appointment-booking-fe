import { createQueryKeys } from '@lukemorales/query-key-factory';
import { QueryOptions } from '@/ts/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import bookingApi from '../services/booking.api';
import {  BookingData, BookingResponse } from '../services/types';

 const bookings = createQueryKeys('booking', {
  newBooking: (body: BookingData) => ({
    queryKey: ['new-booking'],
    queryFn: () => bookingApi.addBooking(body),
  }),
  bookingList: () => ({
    queryKey: ['booking'],
    queryFn: () => bookingApi.getBookings(),
  }),
});

export const useGetBookingsQuery = <T = BookingResponse>(
  options: QueryOptions<T, BookingResponse> = {},
) => {
  return useQuery({
    ...bookings.bookingList(),
    keepPreviousData: true,
    ...options,
  });
};


export const useNewBookingMutation = () => {
  return useMutation<BookingResponse, Error, BookingData>({
    mutationFn:  bookingApi.addBooking as (body: BookingData) => Promise<BookingResponse>,
    onSuccess: (response: BookingResponse) => {
      toast.success(response.message || 'Successfully Retrieved!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to retrieve data');
    },
  });
};