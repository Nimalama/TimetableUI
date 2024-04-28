import { ClassRoutineData, ClassRoutineResponse } from '../interfaces/classInterfaces';
import { getApiData } from '../utility/httpHelper';
 
export const getClassRoutines = async (): Promise<ClassRoutineData[]> => {
  const response = await getApiData<ClassRoutineResponse>({
    endPoint: '/api/classroutine',
    method: 'GET',
    requiresAuth: true
  });
 
  return response.data;
};
 
export const getClassRoutinesTeacher = async (): Promise<ClassRoutineData[]> => {
  const response = await getApiData<ClassRoutineResponse>({
    endPoint: '/api/classroutine/teacher',
    method: 'GET',
    requiresAuth: true
  });
 
  return response.data;
};
 
export const getClassRoutinesStudent = async (): Promise<ClassRoutineData[]> => {
  const response = await getApiData<ClassRoutineResponse>({
    endPoint: '/api/classroutine/student',
    method: 'GET',
    requiresAuth: true
  });
 
  return response.data;
};