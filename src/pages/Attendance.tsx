import { useEffect, useRef, useState } from 'react';
import { AllAttendanceData, Attendance, getAllAttendance, getAttendance } from '../services/attendanceServices';
import useDashboardContext from '../hooks/useChallengesDashboardContext';
import Chart from 'chart.js/auto'; // Import Chart.js

const AttendanceComponent = () => {
  const { userInformation, isStudent, isAdmin, isUserProcessing } = useDashboardContext();

  const [attendance, setAttendance] = useState<Attendance>({ totalAttendedClasses: 0, totalClasses: 0 });

  const [allAttendance, setAllAttendance] = useState<AllAttendanceData>({
    lecturersData: [],
    studentsData: []
  });

  const pieChartRef = useRef<Chart | null>(null);
  const barChartRef = useRef<Chart | null>(null);

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
  }, [userInformation, isUserProcessing, isAdmin, isStudent]);

  useEffect(() => {
    if (!isAdmin) {
      const renderPieChart = () => {
        const canvas = document.getElementById('attendanceChart') as HTMLCanvasElement;

        if (canvas) {
          if (pieChartRef.current) {
            pieChartRef.current.destroy();
          }

          pieChartRef.current = new Chart(canvas, {
            type: 'pie',
            data: {
              labels: ['Attended Classes', 'Remaining Classes'],
              datasets: [
                {
                  data: [attendance.totalAttendedClasses, attendance.totalClasses - attendance.totalAttendedClasses],
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
    }
  }, [attendance, isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      const renderBarChart = () => {
        const canvas = document.getElementById('attendanceBarChart') as HTMLCanvasElement;

        if (canvas) {
          if (barChartRef.current) {
            barChartRef.current.destroy();
          }

          const lecturerNames = allAttendance.lecturersData.map((lecturer) => lecturer.name);
          const studentNames = allAttendance.studentsData.map((student) => student.name);
          const names = lecturerNames.concat(studentNames);

          const attendancePercentages = allAttendance.lecturersData
            .map((lecturer) => (lecturer.totalAttendedClasses / lecturer.totalClasses) * 100)
            .concat(
              allAttendance.studentsData.map((student) => (student.totalAttendedClasses / student.totalClasses) * 100)
            );

          barChartRef.current = new Chart(canvas, {
            type: 'bar',
            data: {
              labels: names,
              datasets: [
                {
                  label: 'Attendance Percentage',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderWidth: 1,
                  data: attendancePercentages
                }
              ]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }
          });
        }
      };

      renderBarChart();
    }
  }, [allAttendance, isAdmin]);

  const mergedData = [
    ...allAttendance.lecturersData.map((ss) => {
      return { ...ss, type: 'Teacher' };
    }),
    ...allAttendance.studentsData.map((ss) => {
      return { ...ss, type: 'Student' };
    })
  ];

  if (isAdmin) {
    return (
      <section className="fg-1 overflow-auto mb-12x">
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
                    <td>{user.totalAttendedClasses}</td>
                    <td>{user.totalClasses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <canvas id="attendanceBarChart" />
          </div>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="fg-1 overflow-auto">
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
  }

  return <></>;
};

export default AttendanceComponent;
