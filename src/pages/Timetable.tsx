import { useEffect, useState } from 'react';
import useDashboardContext from '../hooks/useChallengesDashboardContext';
import { ClassRoutineData } from '../interfaces/classInterfaces';
import { getClassRoutines, getClassRoutinesStudent, getClassRoutinesTeacher } from '../services/timetableServices';
<<<<<<< HEAD
import { convertTimeTableToCSV } from '../utility/helper';

const Timetable = () => {
  const { isAdmin, isStudent, userInformation } = useDashboardContext();

  const [classes, setClasses] = useState<ClassRoutineData[]>([]);

  useEffect(() => {
    if (!userInformation) return;

    fetchClassRoutines();
  }, [userInformation]);

=======
 
const Timetable = () => {
  const { isAdmin, isStudent } = useDashboardContext();
 
  const [classes, setClasses] = useState<ClassRoutineData[]>([]);
 
>>>>>>> 6ffa940099922b15ad1cc74fabb1e30253b36adb
  const fetchClassRoutines = async () => {
    const apiToFetch = isAdmin ? getClassRoutines : isStudent ? getClassRoutinesStudent : getClassRoutinesTeacher;
    try {
      const response = await apiToFetch(); // Replace with your API endpoint
      setClasses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
<<<<<<< HEAD

  const handleExportCSV = () => {
    const csvData = convertTimeTableToCSV(classes ?? []);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `timetable-${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  return (
    <section className="container">
      <div className="d-flex justify-content-between align-items-center my-4x">
        <h2>Class Routine</h2>
        {isAdmin && (
          <button className="btn btn--primary btn--sm" onClick={handleExportCSV}>
            Export
          </button>
        )}
      </div>
      <div className="table-wrapper">
        <table className="common-table">
          <thead>
            <tr>
              <th>SubjectId</th>
              <th>Subject</th>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Room Name</th>
              <th>Faculty Name</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {classes.length > 0
              ? classes.map((classRoutine) => {
                  const {
                    timeSlot: { day, startTime, endTime },
                    lecturer: { fullName },
                    course: { name, code },
                    classroom: { name: roomName }
                  } = classRoutine;
                  return (
                    <tr className="class-routine" key={classRoutine.id}>
                      <td>{code}</td>
                      <td>{name}</td>
                      <td>{day}</td>
                      <td>{startTime}</td>
                      <td>{endTime}</td>
                      <td>{roomName}</td>
                      <td>{fullName}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Timetable;
=======
 
  useEffect(() => {
    fetchClassRoutines();
  }, []);
 
  return <div>{JSON.stringify(classes)}</div>;
};
 
export default Timetable;
>>>>>>> 6ffa940099922b15ad1cc74fabb1e30253b36adb
