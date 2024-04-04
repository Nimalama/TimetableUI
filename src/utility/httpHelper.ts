import axios, { AxiosError, AxiosRequestConfig, Method, ResponseType } from 'axios';

import { ApiErrorMessages } from '../constants/errorMessage';
import { ObjectKeysInterface } from '../interfaces/commonInterfaces';

interface AxiosRequestInterface {
  method?: Method;
  baseURL?: string;
  endPoint: string;
  queryParams?: ObjectKeysInterface;
  data?: ObjectKeysInterface;
  additionalHeaders?: ObjectKeysInterface;
  requiresAuth?: boolean;
  isFormData?: boolean;
  responseType?: ResponseType;
  accessToken?: string;
  signal?: AbortSignal;
}

/**
 * Handle the http request.
 *
 * @export
 * @template T
 * @param {AxiosRequestInterface} {
 *   method = 'GET',
 *   baseURL = BASE_URL,
 *   endPoint,
 *   queryParams = {},
 *   data = {},
 *   additionalHeaders = {},
 *   requiresAuth = false,
 *   isFormData = false,
 *   responseType,
 * }
 * @return {*}  {Promise<T>}
 */
export async function getApiData<T>(options: AxiosRequestInterface): Promise<T> {
  const {
    method = 'GET',
    baseURL = 'BASE_URL',
    endPoint,
    queryParams = {},
    data = {},
    additionalHeaders = {},
    requiresAuth = false,
    isFormData = false,
    responseType,
    accessToken,
    signal
  } = options;

  try {
    let headers;

    if (isFormData) {
      headers = {
        'Content-Type': 'multipart/form-data',
        ...additionalHeaders
      };
    } else {
      headers = {
        'Content-Type': 'application/json',
        ...additionalHeaders
      };
    }

    const options: AxiosRequestConfig = {
      baseURL,
      method,
      url: endPoint,
      data,
      params: queryParams,
      headers,
      timeout: 5 * 60 * 1000,
      signal
    };

    if (responseType) {
      options.responseType = responseType;
    }

    const axiosInstance = axios.create();

    // Add a request interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        // Append the access token to the request header, if needed
        if (requiresAuth) {
          const token = accessToken?.length ? accessToken : '';

          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    const response = await axiosInstance.request(options);

    return response.data as T;
  } catch (err) {
    const error = err as AxiosError;

    if (error.code === 'ETIMEDOUT') {
      throw new Error(ApiErrorMessages.DemoTimeoutError);
    } else if (error.code == 'ECONNABORTED') {
      throw new Error(ApiErrorMessages.TimeoutError);
    } else if (error?.response) {
      switch (error?.response?.status) {
        case 400:
          throw new Error(JSON.stringify(error?.response?.data));
        case 401:
          if (error?.response?.data === '' || !error?.response?.data) {
            // logout();

            throw new Error(ApiErrorMessages.DefaultMessage);
          } else {
            throw new Error(JSON.stringify(error?.response?.data));
          }

        case 404:
          if (error?.response?.data === '' || !error?.response?.data) {
            throw new Error(ApiErrorMessages.NotFound404);
          }

          throw new Error(JSON.stringify(error?.response?.data));
        case 500:
          if (error?.response?.data === '' || !error?.response?.data) {
            throw new Error(ApiErrorMessages.ServerError500);
          } else {
            throw new Error(JSON.stringify(error?.response?.data));
          }
        case 409:
          if (error?.response?.data === '' || !error?.response?.data) {
            throw new Error(ApiErrorMessages.Conflict409);
          } else {
            throw new Error(JSON.stringify(error?.response?.data));
          }

        default:
          throw new Error(ApiErrorMessages.DefaultMessage);
      }
    } else if (error.request) {
      throw new Error(ApiErrorMessages.NetworkError);
    } else {
      throw new Error(ApiErrorMessages.RequestError);
    }
  }
}
