import { SetStateAction } from 'react';
import { IconType } from 'react-icons';

//eslint-disable-next-line
export interface ObjectKeysInterface<T = any> {
  [key: string]: T;
}

export interface GoogleAuthResponseInterface {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface UserInformationInterface {
  fullName: string;
  email: string;
  userType: string;
  token: string;
}

export interface UserLoginPayloadInterface {
  email: string;
  password: string;
}

export interface UserRegisterPayloadInterface extends UserLoginPayloadInterface {
  fullName: string;
  userType: string;
}

export interface ClassroomInterface {
  id: string;
  name: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseInterface {
  id: number;
  name: string;
  code: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoursePayloadInterface {
  name: string;
  code: string;
  credits: number;
}

export interface ClassroomPayloadInterface {
  name: string;
  capacity: number;
}

export interface NavigationTabInterface {
  title: string;
  subTitle: string;
  tabNumber: number;
  icon: IconType;
  link: string;
}

export interface DashboardContextInterface {
  menuBar: boolean;
  setMenuBar: React.Dispatch<SetStateAction<boolean>>;
  activeTab: number;
  setActiveTab: React.Dispatch<SetStateAction<number>>;
}
