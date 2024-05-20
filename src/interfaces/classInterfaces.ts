export interface ClassRoutineData {
  id: number;
  studentIds: string;
  createdAt: string;
  updatedAt: string;
  classroom: {
    id: number;
    name: string;
  };
  course: {
    id: number;
    name: string;
    code: string;
  };
  timeSlot: {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
  };
  lecturer: {
    id: number;
    fullName: string;
    email: string;
  };
  students: {
    id: number;
    fullName: string;
    email: string;
  }[];
}

export interface ClassRoutineResponse {
  data: ClassRoutineData[];
}

export interface Course {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
}

export interface Classroom {
  id: number;
  name: string;
}

export interface TimeSlot {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

export interface ClassRoutineRequirementsInterface {
  courses: Course[];
  lecturers: User[];
  students: User[];
  classrooms: Classroom[];
  timeSlots: TimeSlot[];
}

export interface ClassRoutineRequirementsResponseInterface {
  data: ClassRoutineRequirementsInterface;
}

export interface CommentInterface {
  id: number;
  classRoutineId: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  students: User;
}
