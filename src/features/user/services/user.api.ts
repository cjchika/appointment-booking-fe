import {  RegisterUserData, UserDataMutation, LoginUserData, LogoutUserData, UserLogoutDataMutation } from './types';
import axiosClient from '@/apis/axios-client';

const pathUrl = 'api/auth';

const authApi = {
  register: (body: UserDataMutation): Promise<{ data: RegisterUserData }> =>
    axiosClient.post(`${pathUrl}/register`, body),
  login: (body: UserDataMutation): Promise<{ data: LoginUserData }> =>
    axiosClient.post(`${pathUrl}/login`, body),
  logout: (body: UserLogoutDataMutation): Promise<{ data: LogoutUserData }> =>
    axiosClient.post(`${pathUrl}/logout`, body),

};

export default authApi;
