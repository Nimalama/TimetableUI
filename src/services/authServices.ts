/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import {
  UserRegisterPayloadInterface,
  UserInformationInterface,
  UserLoginPayloadInterface,
  UserProfileInterface
} from '../interfaces/commonInterfaces';
import { getApiData } from '../utility/httpHelper';

export interface AuthCodeInterface {
  code: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export interface GoogleAuthResponseInterface {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export const getTokenResponseFromGoogleAuthCode = async (
  data: AuthCodeInterface
): Promise<GoogleAuthResponseInterface> => {
  const response = await getApiData<GoogleAuthResponseInterface>({
    baseURL: 'https://oauth2.googleapis.com/token',
    endPoint: '',
    method: 'POST',
    data: data,
    additionalHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });

  return response;
};

/**
 * API handler to log in.
 *
 * @export
 * @param {AuthPayloadInterface} data
 * @return {*}  {Promise<UserInformationInterface>}
 */
export const loginUserWithEmail = async (data: UserLoginPayloadInterface): Promise<UserInformationInterface> => {
  try {
    const loginResponse = await getApiData<{ data: UserInformationInterface }>({
      method: 'POST',
      data: data,
      endPoint: '/api/user/login'
    });

    return loginResponse.data;
  } catch (err) {
    throw err;
  }
};

/**
 * API handler to sign up.
 *
 * @export
 * @param {AuthPayloadInterface} data
 * @return {*}  {Promise<UserInformationInterface>}
 */
export const signUpWithEmail = async (data: UserRegisterPayloadInterface): Promise<UserInformationInterface> => {
  try {
    const response = await getApiData<{ data: UserInformationInterface }>({
      method: 'POST',
      data: data,
      endPoint: '/api/user/register'
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export async function signInWithGoogle(data: { idToken: string; userType: string }): Promise<UserInformationInterface> {
  try {
    const response = await getApiData<{ data: UserInformationInterface }>({
      endPoint: '/api/user/google-signin',
      method: 'POST',
      data
    });

    return response.data;
  } catch (err) {
    throw err;
  }
}

//validate token
export async function validateToken(token: string): Promise<UserInformationInterface> {
  try {
    const response = await getApiData<{ data: UserInformationInterface }>({
      endPoint: '/api/user/validateToken',
      method: 'GET',
      queryParams: { token: token }
    });

    return response.data;
  } catch (err) {
    throw err;
  }
}

//get profile
export async function getProfile(): Promise<UserProfileInterface> {
  try {
    const response = await getApiData<{ data: UserProfileInterface }>({
      endPoint: '/api/user/authProfile',
      method: 'GET',
      requiresAuth: true
    });

    return response.data;
  } catch (err) {
    throw err;
  }
}

//patch profile
export async function patchProfile(data: FormData): Promise<boolean> {
  try {
    const response = await getApiData<{ data: boolean }>({
      endPoint: '/api/user/authProfile',
      method: 'PATCH',
      requiresAuth: true,
      additionalHeaders: { 'Content-Type': 'multipart/form-data' },
      data
    });

    return response.data;
  } catch (err) {
    throw err;
  }
}

// forgot password
export async function forgotPassword(email: string): Promise<{ message: string }> {
  try {
    const response = await getApiData<{ data: { message: string } }>({
      endPoint: '/api/user/forgot-password',
      method: 'POST',
      data: { email }
    });

    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function resetPassword(data: { newPassword: string; token: string }): Promise<{ message: string }> {
  try {
    const response = await getApiData<{ data: { success: boolean; message: string } }>({
      endPoint: '/api/user/reset-password',
      method: 'POST',
      data
    });

    return response.data;
  } catch (err) {
    throw err;
  }
}
