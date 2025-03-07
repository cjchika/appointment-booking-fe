export interface BookingData {
  user_id?: number;
  date?: string;
  time_slot?: string;
  note?: string;
}

export interface Booking {
  id: number;
  user_id: number;
  date: string;
  time_slot: string;
  note: string;
  updatedAt: string;
  createdAt: string;
  client?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface BookingResponse {
  code: number;
  status: boolean;
  message: string;
  data: Booking[];
}

export type BookingDataMutation = Partial<
  Pick<BookingData, 'date' | 'time_slot' | 'note' | 'user_id'>
>;
