import { ClassroomInterface, ClassroomPayloadInterface } from '../interfaces/commonInterfaces';
import { getApiData } from '../utility/httpHelper';

export const getClassrooms = async (): Promise<ClassroomInterface[]> => {
  const response = await getApiData<{ data: ClassroomInterface[] }>({
    endPoint: '/api/classroom',
    method: 'GET',
    requiresAuth: true
  });

  return response.data;
};

// create classroom
export const createClassroom = async (classroom: ClassroomPayloadInterface): Promise<ClassroomInterface> => {
  const response = await getApiData<{ data: ClassroomInterface }>({
    endPoint: '/api/classroom',
    method: 'POST',
    requiresAuth: true,
    data: classroom
  });

  return response.data;
};

// remove classroom
export const deleteClassroom = async (classroomId: number): Promise<boolean> => {
  const response = await getApiData<{ data: boolean }>({
    endPoint: `/api/classroom/${classroomId}`,
    method: 'DELETE',
    requiresAuth: true
  });

  return response.data;
};
