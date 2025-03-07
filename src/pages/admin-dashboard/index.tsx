import React, { FC } from 'react';
import {
  Backdrop,
  Card,
  CircularProgress,
  Typography,
  Grid,
  Avatar,
} from '@mui/material';
import { useGetBookingsQuery } from '@/features/booking';
import { format } from 'date-fns';

const AdminDashboard: FC = () => {
  const {
    data: bookings,
    isLoading: loadingBookings,
    error,
  } = useGetBookingsQuery();

  const isUnauthorized = error;
  const isEmpty = !bookings?.data || bookings.data.length === 0;

  return (
    <React.Fragment>
      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingBookings}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Main Container */}
      <div className="flex justify-center mt-7">
        <Card className="p-6 w-full max-w-5xl rounded-lg">
          <Typography
            variant="h4"
            className="!mb-6 !font-bold !text-primary text-center uppercase"
          >
            Booking Appointments
          </Typography>

          {/* Handle API Errors */}
          {error ? (
            <Typography variant="body1" className="!text-red-500  text-center">
              {isUnauthorized
                ? 'Oops! It looks like you don’t have access to this section. Reach out to support if you think this is a mistake.'
                : 'Failed to fetch bookings. Please try again later.'}
            </Typography>
          ) : isEmpty ? (
            <Typography variant="body1" className="!text-gray-600">
              No bookings found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {bookings.data.map((booking) => {
                const client = booking?.client;
                const firstName = client?.firstName ?? 'Unknown';
                const lastName = client?.lastName ?? 'Client';
                const formattedDate = booking.date
                  ? format(new Date(booking.date), 'MMMM d, yyyy')
                  : 'Unknown Date';
                const timeSlot = booking.time_slot ?? 'No time slot';
                const note = booking.note || 'No additional notes';

                return (
                  <Grid item xs={12} sm={6} key={booking.id}>
                    <Card className="p-4 shadow-md rounded-lg transition-all duration-300 hover:shadow-lg !bg-gray-50 !bg-opacity-15">
                      {/* Avatar */}
                      <div className="flex items-center space-x-3">
                        <Avatar
                          className="!bg-primary text-white !font-semibold"
                          sx={{ width: 40, height: 40 }}
                        >
                          {firstName.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                          <Typography
                            variant="h6"
                            className="!font-semibold !text-gray-800"
                          >
                            {firstName} {lastName}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="!text-gray-500"
                          >
                            📅 {formattedDate} | ⏰ {timeSlot}
                          </Typography>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <Typography
                        variant="body2"
                        className="!text-gray-600 !mt-3"
                      >
                        📝 {note}
                      </Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
