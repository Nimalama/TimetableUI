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
  id: string;
  fullName: string;
  email: string;
  userType: string;
  token: string;
  category: string
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
  category: string;
  coursePic: string | null;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  status: string;
}

export interface CoursePayloadInterface {
  name: string;
  code: string;
  credits: number | null;
  category: string | null;
  description: string | null;
  coursePic: File | null;
  status: string
}

export interface ClassroomPayloadInterface {
  name: string;
  capacity: string;
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
  userInformation: UserInformationInterface | null;
  isAdmin: boolean;
  isStudent: boolean;
  isTeacher: boolean;
  isUserProcessing: boolean;
}

export interface ProfilePayloadInterface {
  profilePic: File | null;
  address: string | null;
  department: string | null;
  fullName: string;
}

export interface UserProfileInterface extends ProfilePayloadInterface {
  id: number;
  email: string;
  userType: string;
  category: string
  createdAt: string;
  updatedAt: string;
}
