import Chart from 'chart.js/auto'; // Import Chart.js
import { useEffect, useRef, useState } from 'react';
import useDashboardContext from '../../hooks/useChallengesDashboardContext';
import { AllAttendanceData, getAllAttendance } from '../../services/attendanceServices';
import MultiSelect from './SelectMultiple';
import TableAttend from './TableAttend';

interface Option {
  value: string;
  label: string;
}

const AttendanceComponent = () => {
  const { userInformation, isAdmin, isUserProcessing } = useDashboardContext();

  const [allAttendance, setAllAttendance] = useState<AllAttendanceData>({
    lecturersData: [],
    studentsData: []
  });

  const [selectedStudents, setSelectedStudents] = useState<Option[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<Option[]>([]);

  const studentBarChartRef = useRef<Chart | null>(null);
  const teacherBarChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await getAllAttendance();
        setAllAttendance(response);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    if (isUserProcessing) {
      fetchAttendanceData();
    }
  }, [userInformation, isUserProcessing, isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      const renderBarChart = (
        canvasId: string,
        data: { name: string; totalAttendedClasses: number; totalClasses: number }[]
      ) => {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        if (canvas) {
          const chartRef = canvasId === 'studentAttendanceBarChart' ? studentBarChartRef : teacherBarChartRef;
          chartRef.current?.destroy();

          const names = data.map((item) => item.name);
          const attendancePercentages = data.map((item) => (item.totalAttendedClasses / item.totalClasses) * 100);

          const backgroundColors = attendancePercentages.map((percentage) => {
            if (percentage < 50) return 'rgba(255, 0, 0, 0.5)'; // Red
            if (percentage < 75) return 'rgba(255, 255, 0, 0.5)'; // Yellow
            return 'rgba(0, 255, 0, 0.5)'; // Green
          });

          chartRef.current = new Chart(canvas, {
            type: 'bar',
            data: {
              labels: names,
              datasets: [
                {
                  label: 'Attendance Percentage',
                  backgroundColor: backgroundColors,
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

      // onlu populate the data in selectedStudents and selectedTeachers if the data is available
      const studentsData = allAttendance.studentsData.filter((student) =>
        selectedStudents.some((selected) => selected.value === student.name)
      );

      const lecturersData = allAttendance.lecturersData.filter((teacher) =>
        selectedTeachers.some((selected) => selected.value === teacher.name)
      );

      renderBarChart('studentAttendanceBarChart', studentsData);
      renderBarChart('teacherAttendanceBarChart', lecturersData);
    }
  }, [selectedStudents, selectedTeachers, isAdmin]);

  const studentOptions = allAttendance.studentsData.map((student) => ({ value: student.name, label: student.name }));
  const teacherOptions = allAttendance.lecturersData.map((teacher) => ({ value: teacher.name, label: teacher.name }));

  return (
    <section className="fg-1 overflow-auto mb-12x">
      <div className="container">
        <TableAttend
          data={[
            ...allAttendance.lecturersData.map((lecturer) => ({ ...lecturer, type: 'Teacher' })),
            ...allAttendance.studentsData.map((student) => ({ ...student, type: 'Student' }))
          ]}
        />
        <div className="py-6x">
          <MultiSelect
            options={studentOptions}
            selectedOptions={selectedStudents}
            onChange={setSelectedStudents}
            label="Select Students"
            max={5}
          />

          <canvas id="studentAttendanceBarChart" />
        </div>
        <div className="py-8x">
          <MultiSelect
            options={teacherOptions}
            selectedOptions={selectedTeachers}
            onChange={setSelectedTeachers}
            label="Select Teachers"
            max={5}
          />
          <canvas id="teacherAttendanceBarChart" />
        </div>
      </div>
    </section>
  );
};

export default AttendanceComponent;
