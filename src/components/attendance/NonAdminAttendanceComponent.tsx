import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { NewAttendance, getAttendance } from '../../services/attendanceServices';
import useDashboardContext from '../../hooks/useChallengesDashboardContext';

interface CourseAttendanceStats {
  courseName: string;
  totalClassesCompleted: number;
  totalClassesAttended: number;
  totalAbsentCount: number;
}

const NonAdminAttendanceComponent = () => {
  const { isStudent, isUserProcessing } = useDashboardContext();
  const [attendance, setAttendance] = useState<CourseAttendanceStats[]>([]);

  const barChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const route = isStudent ? '/api/attendance/student' : '/api/attendance/teacher';
        const response = await getAttendance(route);
        setAttendance(response);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    if (isUserProcessing) {
      fetchAttendanceData();
    }
  }, [isUserProcessing, isStudent]);

  useEffect(() => {
    const renderBarChart = () => {
      const canvas = document.getElementById('attendanceBarChart') as HTMLCanvasElement;

      if (canvas) {
        barChartRef.current?.destroy();

        const labels = attendance.map((course) => course.courseName);
        const data = attendance.map((course) => (course.totalClassesAttended / course.totalClassesCompleted) * 100);

        barChartRef.current = new Chart(canvas, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Attendance Percentage',
                data,
                backgroundColor: data.map((percentage) =>
                  percentage < 50
                    ? 'rgba(255, 0, 0, 0.5)'
                    : percentage < 75
                    ? 'rgba(255, 255, 0, 0.5)'
                    : 'rgba(0, 255, 0, 0.5)'
                )
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

    if (attendance.length > 0) {
      renderBarChart();
    }
  }, [attendance]);

  if (attendance.length < 1) {
    return (
      <section className="fg-1 overflow-auto">
        <div className="container">
          <div className="d-flex justify-content-center my-6x">
            No attendance data available. Please check back later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="fg-1 overflow-auto">
      <div className="container">
        <div className="d-flex justify-content-center my-6x">
          {attendance.length > 0 && (
            <div style={{ width: '600px', margin: '20px' }}>
              <h3>Overall Attendance Percentage</h3>
              <canvas id="attendanceBarChart" />
            </div>
          )}
        </div>

        {attendance.length > 0 && (
          <div className="d-flex justify-content-center my-6x">
            <table className="table-auto border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Course Name</th>
                  <th className="border border-gray-300 px-4 py-2">Total Classes Completed</th>
                  <th className="border border-gray-300 px-4 py-2">Total Classes Attended</th>
                  <th className="border border-gray-300 px-4 py-2">Total Absent Count</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((course, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{course.courseName}</td>
                    <td className="border border-gray-300 px-4 py-2">{course.totalClassesCompleted}</td>
                    <td className="border border-gray-300 px-4 py-2">{course.totalClassesAttended}</td>
                    <td className="border border-gray-300 px-4 py-2">{course.totalAbsentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default NonAdminAttendanceComponent;
