import { useEffect, useState } from 'react';
import { AllAttendanceData, Attendance, getAllAttendance, getAttendance } from '../services/attendanceServices';
import useDashboardContext from '../hooks/useChallengesDashboardContext';
import Chart from 'chart.js/auto'; // Import Chart.js

const AttendanceComponent = () => {
  const { userInformation, isStudent, isAdmin, isUserProcessing } = useDashboardContext();

  const [attendance, setAttendance] = useState<Attendance>({ attendedClasses: 0, totalClasses: 0 });

  const [allAttendance, setAllAttendance] = useState<AllAttendanceData>({
    lecturersData: [],
    studentsData: []
  });

  useEffect(() => {
    if (!isUserProcessing) return;

    if (isAdmin) {
      const fetchAllAttendance = async () => {
        try {
          const response = await getAllAttendance(); // Replace with your API endpoint
          setAllAttendance(response);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      fetchAllAttendance();
    } else {
      const fetchAttendance = async () => {
        try {
          const route = isStudent ? '/api/attendance/student' : '/api/attendance/teacher';
          const response = await getAttendance(route); // Replace with your API endpoint
          setAttendance(response);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      fetchAttendance();
    }
  }, [userInformation]);

  useEffect(() => {
    const renderPieChart = () => {
      const canvas = document.getElementById('attendanceChart') as HTMLCanvasElement;

      if (canvas) {
        new Chart(canvas, {
          type: 'pie',
          data: {
            labels: ['Attended Classes', 'Remaining Classes'],
            datasets: [
              {
                data: [attendance.attendedClasses, attendance.totalClasses - attendance.attendedClasses],
                backgroundColor: ['#36a2eb', '#ff6384']
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    };

    renderPieChart();
  }, [attendance]);

  // need to add type teacher or student to allAttendance data
  const mergedData = [
    ...allAttendance.lecturersData.map((ss) => {
      return { ...ss, type: 'Teacher' };
    }),

    ...allAttendance.studentsData.map((ss) => {
      return { ...ss, type: 'Student' };
    })
  ];

  if (isAdmin)
    return (
      <section className="fg-1">
        <div className="container">
          <div className="table-wrapper my-6x">
            <table className="common-table">
              <thead>
                <tr>
                  <th>UserType</th>
                  <th>Full Name</th>
                  <th>Classes Attended</th>
                  <th>Total Classes To Attend</th>
                </tr>
              </thead>
              <tbody>
                {mergedData.map((user) => (
                  <tr key={user.name}>
                    <td>{user.type}</td>
                    <td>{user.name}</td>
                    <td>{user.attendedClasses}</td>
                    <td>{user.totalClasses}</td>

                    {/* Add additional columns if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );

  if (!isAdmin)
    return (
      <section className="fg-1">
        <div className="container">
          <div className="d-flex justify-content-center my-6x">
            {attendance.totalClasses === 0 ? (
              'No classes assigned yet.'
            ) : (
              <div>
                <canvas id="attendanceChart" />
              </div>
            )}
          </div>
        </div>
      </section>
    );

  return <></>;
};

export default AttendanceComponent;
