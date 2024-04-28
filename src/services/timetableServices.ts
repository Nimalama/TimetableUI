import { ClassRoutineData, ClassRoutineResponse } from '../interfaces/classInterfaces';
import { getApiData } from '../utility/httpHelper';
<<<<<<< HEAD

=======
 
>>>>>>> 6ffa940099922b15ad1cc74fabb1e30253b36adb
export const getClassRoutines = async (): Promise<ClassRoutineData[]> => {
  const response = await getApiData<ClassRoutineResponse>({
    endPoint: '/api/classroutine',
    method: 'GET',
    requiresAuth: true
  });
<<<<<<< HEAD

  return response.data;
};

=======
 
  return response.data;
};
 
>>>>>>> 6ffa940099922b15ad1cc74fabb1e30253b36adb
export const getClassRoutinesTeacher = async (): Promise<ClassRoutineData[]> => {
  const response = await getApiData<ClassRoutineResponse>({
    endPoint: '/api/classroutine/teacher',
    method: 'GET',
    requiresAuth: true
  });
<<<<<<< HEAD

  return response.data;
};

=======
 
  return response.data;
};
 
>>>>>>> 6ffa940099922b15ad1cc74fabb1e30253b36adb
export const getClassRoutinesStudent = async (): Promise<ClassRoutineData[]> => {
  const response = await getApiData<ClassRoutineResponse>({
    endPoint: '/api/classroutine/student',
    method: 'GET',
    requiresAuth: true
  });
<<<<<<< HEAD

  return response.data;
};
=======
 
  return response.data;
};
>>>>>>> 6ffa940099922b15ad1cc74fabb1e30253b36adb
