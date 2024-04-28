import { CourseInterface, CoursePayloadInterface } from '../interfaces/commonInterfaces';
import { getApiData } from '../utility/httpHelper';

export const getCourses = async (): Promise<CourseInterface[]> => {
  const response = await getApiData<{ data: CourseInterface[] }>({
    endPoint: '/api/course',
    method: 'GET',
    requiresAuth: true
  });

  return response.data;
};

// create course
export const createCourse = async (course: CoursePayloadInterface): Promise<CourseInterface> => {
  const response = await getApiData<{ data: CourseInterface }>({
    endPoint: '/api/course',
    method: 'POST',
    requiresAuth: true,
    data: course,
    additionalHeaders: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

export const updateCourse = async (course: CoursePayloadInterface, courseId: number): Promise<CourseInterface> => {
  const response = await getApiData<{ data: CourseInterface }>({
    endPoint: `/api/course/${courseId}`,
    method: 'PATCH',
    requiresAuth: true,
    data: course,
    additionalHeaders: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

//delete course
export const deleteCourse = async (courseId: number): Promise<boolean> => {
  const response = await getApiData<{ data: boolean }>({
    endPoint: `/api/course/${courseId}`,
    method: 'DELETE',
    requiresAuth: true
  });

  return response.data;
};
