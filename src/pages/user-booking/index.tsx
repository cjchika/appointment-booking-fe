import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  Typography,
  MenuItem,
  Select,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useNewBookingMutation, BookingDataMutation } from '@/features/booking';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const allowedSlots = [
  '08:00-08:30',
  '08:30-09:00',
  '09:00-09:30',
  '09:30-10:00',
  '10:00-10:30',
  '10:30-11:00',
  '11:00-11:30',
  '11:30-12:00',
  '12:00-12:30',
  '12:30-13:00',
  '13:00-13:30',
  '13:30-14:00',
  '14:00-14:30',
  '14:30-15:00',
  '15:00-15:30',
  '15:30-16:00',
  '16:00-16:30',
  '16:30-17:00',
];

const UserBooking = () => {
  const user = JSON.parse(localStorage.getItem('prevuser') || 'null');
  const [startDate, setStartDate] = useState(new Date());
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      time_slot: '',
      note: '',
      user_id: user.id,
    },
  });
  const { mutate: addBooking, isLoading: loadingCreate } =
    useNewBookingMutation();

  const onSubmit = (body: BookingDataMutation) => {
    const formattedBody = {
      ...body,
      date: body.date ? new Date(body.date).toISOString() : undefined,
    };
    addBooking(formattedBody, {
      onSuccess: (response) => {
        console.log('Booking success:', response);
        // Reset the form after successful booking
        setStartDate(new Date());
        setValue('date', format(new Date(), 'yyyy-MM-dd'));
        setValue('time_slot', '');
        setValue('note', '');
      },
      onError: (error) => {
        console.error('Booking failed:', error);
      },
    });
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingCreate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="py-14 bg-gray-100 bg-opacity-10 flex flex-col">
        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full md:w-[80%] flex flex-col items-center bg-white p-5 rounded-2xl shadow-lg">
            <Typography
              variant="h3"
              className="text-center !mb-3 uppercase !font-semibold text-primary"
            >
              Start Booking
            </Typography>

            {/* Date Picker */}
            <div className="mb-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date!);
                  setValue('date', format(date!, 'yyyy-MM-dd'));
                }}
                inline
                minDate={new Date()}
                filterDate={isWeekday}
                showDisabledMonthNavigation
              />
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
              {/* Time Slot Selection */}
              <FormControl fullWidth className="!mb-4">
                <Controller
                  name="time_slot"
                  control={control}
                  rules={{ required: 'Time slot is required' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Time Slot"
                      error={!!errors.time_slot}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select a time slot
                      </MenuItem>
                      {allowedSlots.map((slot) => (
                        <MenuItem key={slot} value={slot}>
                          {slot}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.time_slot && (
                  <Typography variant="caption" color="error">
                    {errors.time_slot.message}
                  </Typography>
                )}
              </FormControl>

              {/* Note Textarea */}
              <FormControl fullWidth className="!mb-4 !rounded-lg">
                <Controller
                  name="note"
                  control={control}
                  rules={{ required: 'Note is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Note"
                      multiline
                      rows={5}
                      error={!!errors.note}
                      helperText={errors.note?.message}
                    />
                  )}
                />
              </FormControl>

              {/* Submit Button */}
              <Button
                disabled={loadingCreate}
                className="!bg-primary hover:!bg-blue-600 !font-semibold !py-3 !text-xl"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {loadingCreate ? 'Please wait...' : 'Book Now'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBooking;
