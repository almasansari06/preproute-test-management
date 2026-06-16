import { ApiResponse } from '../types';

type LoginResponse = {
  token: string;
  user: Record<string, unknown>;
};

export const loginUser = async (payload: {
  userId: string;
  password: string;
}): Promise<ApiResponse<LoginResponse>> => {
  if (
    payload.userId === 'admin' &&
    payload.password === 'admin123'
  ) {
    return {
      success: true,
      data: {
        token: 'demo-jwt-token',
        user: {
          id: '1',
          name: 'Admin User',
        },
      },
      message: 'Login successful',
    };
  }

  throw {
    response: {
      data: {
        message: 'Invalid user ID or password.',
      },
    },
  };
};