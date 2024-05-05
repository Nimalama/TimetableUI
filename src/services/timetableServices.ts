import { TimeFormData } from '../components/modals/CreateTimeTableModal';
import {
  ClassRoutineData,
  ClassRoutineRequirementsInterface,
  ClassRoutineRequirementsResponseInterface,
  ClassRoutineResponse
} from '../interfaces/classInterfaces';
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

export const getClassRoutineRequirements = async (): Promise<ClassRoutineRequirementsInterface> => {
  const response = await getApiData<ClassRoutineRequirementsResponseInterface>({
    endPoint: '/api/classroutine/requirements',
    method: 'GET',
    requiresAuth: true
  });

  return response.data;
};

export const createTimeSlots = async (payload: TimeFormData): Promise<TimeFormData> => {
  const response = await getApiData<{ data: TimeFormData }>({
    endPoint: '/api/classroutine',
    method: 'POST',
    requiresAuth: true,
    data: { ...payload }
  });

  return response.data;
};
