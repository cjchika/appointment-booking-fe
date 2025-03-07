import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, FormControl, Typography } from '@mui/material';
import { useLoginMutation, UserDataMutation } from '@/features/user';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: login, isLoading: loadingLogin } = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (body: UserDataMutation) => {
    login(body, {
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
    <div className="py-14 bg-gray-50  flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full md:w-[30%] bg-white p-8 rounded-2xl shadow-lg">
          <Typography
            variant="h6"
            className="text-center !mb-3 uppercase !font-semibold text-primary"
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <Button
              disabled={loadingLogin}
              className="!bg-primary"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {loadingLogin ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
