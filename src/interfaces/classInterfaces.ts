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
