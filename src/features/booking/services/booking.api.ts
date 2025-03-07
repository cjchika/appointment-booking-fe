import { BookingResponse, BookingData, BookingDataMutation } from './types';
import axiosClient from '@/apis/axios-client';

const pathUrl = 'api/booking';

const bookingApi = {
  getBookings: (): Promise<BookingResponse> => axiosClient.get(pathUrl),
  addBooking: (body: BookingDataMutation): Promise<{ data: BookingData }> =>
    axiosClient.post(pathUrl, body),
};

export default bookingApi;
