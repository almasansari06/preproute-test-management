import { ApiResponse } from '../types';

type LoginResponse = { token: string; user: Record<string, unknown> };

export const loginUser = async (payload: { userId: string; password: string }) => {
  if (payload.userId === 'admin' && payload.password === 'admin123') {
    const response: ApiResponse<LoginResponse> = {
      success: true,
      data: {
        token: 'demo-jwt-token',
        user: {
          id: '1',
          name: 'Admin User',
          userId: 'admin'
        }
      },
      message: 'Login successful'
    };

    return response;
  }

  throw {
    response: {
      data: {
        message: 'Invalid user ID or password.'
      }
    }
  };
};