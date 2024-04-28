import { useEffect, useState } from 'react';
import useDashboardContext from '../hooks/useChallengesDashboardContext';
import { ClassRoutineData } from '../interfaces/classInterfaces';
import { getClassRoutines, getClassRoutinesStudent, getClassRoutinesTeacher } from '../services/timetableServices';
 
const Timetable = () => {
  const { isAdmin, isStudent } = useDashboardContext();
 
  const [classes, setClasses] = useState<ClassRoutineData[]>([]);
 
  const fetchClassRoutines = async () => {
    const apiToFetch = isAdmin ? getClassRoutines : isStudent ? getClassRoutinesStudent : getClassRoutinesTeacher;
    try {
      const response = await apiToFetch(); // Replace with your API endpoint
      setClasses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
 
  useEffect(() => {
    fetchClassRoutines();
  }, []);
 
  return <div>{JSON.stringify(classes)}</div>;
};
 
export default Timetable;