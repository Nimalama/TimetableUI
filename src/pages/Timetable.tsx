import { useCallback, useEffect, useState } from 'react';
import useDashboardContext from '../hooks/useChallengesDashboardContext';
import { ClassRoutineData, ClassRoutineRequirementsInterface } from '../interfaces/classInterfaces';
import {
  createTimeSlots,
  getClassRoutineRequirements,
  getClassRoutines,
  getClassRoutinesStudent,
  getClassRoutinesTeacher
} from '../services/timetableServices';
import { convertTimeTableToCSV } from '../utility/helper';
import CreateClassRoutineModal, { TimeFormData } from '../components/modals/CreateTimeTableModal';

const Timetable = () => {
  const { isAdmin, isStudent, userInformation } = useDashboardContext();

  const [classes, setClasses] = useState<ClassRoutineData[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [classRequirements, setClassRequirements] = useState<ClassRoutineRequirementsInterface>();

  const [formData, setFormData] = useState<TimeFormData>({
    classRoomId: 0,
    courseId: 0,
    timeSlotId: 0,
    lecturerId: 0,
    studentIds: []
  });

  const fetchClassRoutines = useCallback(async () => {
    const apiToFetch = isAdmin ? getClassRoutines : isStudent ? getClassRoutinesStudent : getClassRoutinesTeacher;
    try {
      const response = await apiToFetch(); // Replace with your API endpoint
      setClasses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, [isAdmin, isStudent]);

  useEffect(() => {
    if (!userInformation) return;

    const fetchClassRequirements = async () => {
      try {
        // Replace with your API endpoint
        const response = await getClassRoutineRequirements();
        setClassRequirements(response);
      } catch (error) {
        console.error('Error fetching class requirements:', error);
      }
    };

    fetchClassRoutines();
    fetchClassRequirements();
  }, [isAdmin, isStudent, userInformation, fetchClassRoutines]);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const handleExportCSV = () => {
    const csvData = convertTimeTableToCSV(classes ?? []);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `timetable-${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  const handleFormSubmit = async () => {
    try {
      const response = await createTimeSlots(formData);

      if (response) {
        fetchClassRoutines();
        toggleCreateModal();
        setFormData({
          classRoomId: 0,
          courseId: 0,
          timeSlotId: 0,
          lecturerId: 0,
          studentIds: []
        });
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  let filteredClasses = classes;

  if (selectedCategory === 'Monthly') {
    const currentDate = new Date();
    const nextThirtyDays = new Date(currentDate);
    nextThirtyDays.setDate(currentDate.getDate() + 30);

    filteredClasses = filteredClasses.filter((classItem) => {
      const classDate = new Date(classItem.timeSlot.day);
      return classDate >= currentDate && classDate <= nextThirtyDays;
    });
  }

  if (selectedCategory === 'Weekly') {
    const currentDate = new Date();
    const nextSevenDays = new Date(currentDate);
    nextSevenDays.setDate(currentDate.getDate() + 7);

    filteredClasses = filteredClasses.filter((classItem) => {
      const classDate = new Date(classItem.timeSlot.day);
      return classDate >= currentDate && classDate <= nextSevenDays;
    });
  }

  return (
    <section className="container">
      <div className="d-flex justify-content-between align-items-center my-4x">
        <h2>Class Routine</h2>

        <div className="d-flex">
          {isAdmin && (
            <button
              onClick={() => {
                toggleCreateModal();
              }}
              className="btn btn--primary btn--sm mr-4x"
            >
              Create
            </button>
          )}
          <button className="btn btn--primary btn--sm" onClick={handleExportCSV}>
            Export
          </button>
          <div className="form-group ml-4x d-flex align-items-center mb-0">
            <select
              className="form-control ml-2x-md py-2x"
              value={selectedCategory ?? ''}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select range</option>
              <option value="Weekly">Next 7 days</option>
              <option value="Monthly">Next 30 days</option>
            </select>
          </div>
        </div>
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
            {filteredClasses.length > 0
              ? filteredClasses.map((classRoutine) => {
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

      <CreateClassRoutineModal
        classRequirements={classRequirements}
        handleClose={toggleCreateModal}
        show={showCreateModal}
        handleSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </section>
  );
};

export default Timetable;
