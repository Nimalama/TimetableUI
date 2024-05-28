import { CommentInterface } from '../interfaces/classInterfaces';
import { getApiData } from '../utility/httpHelper';

export interface Attendance {
  totalAttendedClasses: number;
  totalClasses: number;
}

export interface NewAttendance {
  courseName: string;
  totalClassesCompleted: number;
  totalClassesAttended: number;
  totalAbsentCount: number;
}

export interface AttendanceInstance extends Attendance {
  name: string;
}

export interface AllAttendanceData {
  lecturersData: AttendanceInstance[];
  studentsData: AttendanceInstance[];
}

interface AllAttendanceResponse {
  data: AllAttendanceData;
}

export const getAttendance = async (route: string): Promise<NewAttendance[]> => {
  const response = await getApiData<{ data: NewAttendance[] }>({
    endPoint: route,
    method: 'GET',
    requiresAuth: true
  });

  return response.data;
};

export const saveAttendance = async (payload: { classRoutineId: number; studentIds: number[] }): Promise<boolean> => {
  const response = await getApiData<{ data: boolean }>({
    endPoint: '/api/attendance',
    method: 'POST',
    requiresAuth: true,
    data: { ...payload }
  });

  return response.data;
};

export const getAllAttendance = async (): Promise<AllAttendanceData> => {
  const response = await getApiData<AllAttendanceResponse>({
    endPoint: '/api/attendance/all',
    method: 'GET',
    requiresAuth: true
  });

  return response.data;
};

export const saveComment = async (payload: { classRoutineId: number; comment: string }): Promise<boolean> => {
  const response = await getApiData<{ data: boolean }>({
    endPoint: '/api/comment',
    method: 'POST',
    requiresAuth: true,
    data: { ...payload }
  });

  return response.data;
};

export const getComments = async (): Promise<CommentInterface[]> => {
  const response = await getApiData<{ data: CommentInterface[] }>({
    endPoint: '/api/comment',
    method: 'GET',
    requiresAuth: true
  });

  return response.data;
};

export const deleteComment = async (id: number): Promise<boolean> => {
  const response = await getApiData<{ data: boolean }>({
    endPoint: `/api/comment/${id}`,
    method: 'DELETE',
    requiresAuth: true
  });

  return response.data;
};
