import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import authApi from '../services/user.api';
import {  RegisterUserData, UserResponse, LoginUserData, LogoutUserData } from '../services/types';

 createQueryKeys('auth', {
  register: (body: RegisterUserData) => ({
    queryKey: ['register'],
    queryFn: () => authApi.register(body),
  }),
  login: (body: LoginUserData) => ({
    queryKey: ['login'],
    queryFn: () => authApi.login(body),
  }),
  logout: (body: LogoutUserData) => ({
    queryKey: ['logout'],
    queryFn: () => authApi.logout(body),
  }),
});


export const useRegisterMutation = () => {
  return useMutation<UserResponse, Error, RegisterUserData>({
    mutationFn:  authApi.register as (body: RegisterUserData) => Promise<UserResponse>,
    onSuccess: (response: UserResponse) => {
      toast.success(response.message || 'Successfully Registered!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create account');
    },
  });
};

export const useLoginMutation = () => {
  return useMutation<UserResponse, Error, LoginUserData>({
    mutationFn: authApi.login as (body: LoginUserData) => Promise<UserResponse>,
    onSuccess: (response: UserResponse) => {
      toast.success(response.message || 'Successfully Logged In!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to login');
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApi.logout ,
    onSuccess: () => {
      toast.success( 'Successfully Logged out!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to login');
    },
  });
};
