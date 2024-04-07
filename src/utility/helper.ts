import { ObjectKeysInterface } from '../interfaces/commonInterfaces';

export const isObjectEmpty = (obj: ObjectKeysInterface): boolean => !Object.keys(obj).length;

export const logout = () => {
  //remove token from localStorage
  localStorage.removeItem('userInformation');

  // set window location to login
  window.location.href = '/login';
};
