export type RegisterUserData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  address?: string;
  phone_number?: string;
};

export type LoginUserData = {
  email?: string;
  password?: string;
};

export type LogoutUserData = {
  refresh_token?: string;
};

export interface UserResponse {
  status: boolean;
  message: string;
  data: {
    role: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone_number: string;
    uuid: string;
    status: number;
    email_verified: number;
    updatedAt: string;
    createdAt: string;
  };
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}

export type UserDataMutation = Partial<
  Pick<RegisterUserData, 'email' | 'address' | 'phone_number' | 'password' | 'confirm_password' | 'firstName' | 'lastName' >
>;

export type UserLogoutDataMutation = Partial<
  Pick<LogoutUserData, 'refresh_token'>
>;
