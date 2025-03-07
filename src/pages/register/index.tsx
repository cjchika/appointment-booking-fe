import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, FormControl, Typography } from '@mui/material';
import { UserDataMutation, useRegisterMutation } from '@/features/user';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
      address: '',
      phone_number: '',
      role: 'user',
    },
  });

  const { mutate: register, isLoading: loadingLogin } = useRegisterMutation();
  const navigate = useNavigate();

  console.log();

  const onSubmit = (body: UserDataMutation) => {
    register(body, {
      onSuccess: (response) => {
        // Save user data and tokens to localStorage
        localStorage.setItem('prevuser', JSON.stringify(response.data));
        localStorage.setItem('prevtoken', response.tokens.access.token);
        localStorage.setItem(
          'prevrefreshToken',
          JSON.stringify(response.tokens.refresh.token),
        );

        if (response.data.role === 'user') {
          navigate('/user-booking');
        } else if (response.data.role === 'admin') {
          navigate('/admin-dashboard');
        }
      },
      onError: (error) => {
        console.error('Registration failed:', error);
      },
    });
  };

  return (
    <div className="py-14 bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full md:w-[30%] bg-white p-8 rounded-2xl shadow-lg">
          <Typography
            variant="h6"
            className="text-center !mb-3 uppercase !font-semibold text-primary"
          >
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth className="!mb-4 ">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth className="!mb-4">
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth className="!mb-4">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth className="!mb-4">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth className="!mb-4">
              <Controller
                name="confirm_password"
                control={control}
                rules={{
                  required: 'Confirm Password is required',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth className="!mb-4">
              <Controller
                name="address"
                control={control}
                rules={{ required: 'Address is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth className="!mb-4">
              <Controller
                name="phone_number"
                control={control}
                rules={{
                  required: 'Phone Number is required',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    error={!!errors.phone_number}
                    helperText={errors.phone_number?.message}
                  />
                )}
              />
            </FormControl>

            <Button
              disabled={loadingLogin}
              className="!bg-primary"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {loadingLogin ? 'Loading...' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
