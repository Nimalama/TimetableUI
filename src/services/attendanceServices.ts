import { getApiData } from '../utility/httpHelper';
 
export interface Attendance {

  totalAttendedClasses: number;

  totalClasses: number;

}
 
interface AttendanceResponse {

  data: Attendance;

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
 
export const getAttendance = async (route: string): Promise<Attendance> => {

  const response = await getApiData<AttendanceResponse>({

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