import { useCallback, useEffect, useState } from 'react';
import useDashboardContext from '../hooks/useChallengesDashboardContext';
import { ClassRoutineData, ClassRoutineRequirementsInterface } from '../interfaces/classInterfaces';
import {
  createTimeSlots,
  getClassRoutineRequirements,
  getClassRoutines,
  getClassRoutinesStudent,
  getClassRoutinesTeacher,
  updateTimeSlots
} from '../services/timetableServices';
import { convertTimeTableToCSV } from '../utility/helper';
import CreateClassRoutineModal, { TimeFormData } from '../components/modals/CreateTimeTableModal';
import { Button } from 'react-bootstrap';
import SaveAttendanceModal from '../components/modals/SaveAttendanceModal';
import AddCommentModal from '../components/modals/AddCommentModal';
import { MODAL_TYPES } from '../constants/consts';

const Timetable = () => {
  const { isAdmin, isStudent, isTeacher, userInformation } = useDashboardContext();

  const [classes, setClasses] = useState<ClassRoutineData[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [classRequirements, setClassRequirements] = useState<ClassRoutineRequirementsInterface>();
  const [modalMode, setModalMode] = useState(MODAL_TYPES.CREATE_MODE);
  const [selectedId, setSelectedId] = useState(0);

  const [formData, setFormData] = useState<TimeFormData>({
    classRoomId: 0,
    courseId: 0,
    timeSlotId: 0,
    lecturerId: 0,
    studentIds: [],
    singleSlot: true
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

  const toggleAttendanceModal = () => {
    setShowAttendanceModal(!showAttendanceModal);
  };

  const toggleCommentModal = () => {
    setShowCommentModal(!showCommentModal);
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
    if (modalMode === MODAL_TYPES.CREATE_MODE) {
      try {
        const response = await createTimeSlots(formData);

        if (response) {
          fetchClassRoutines();
          setShowCreateModal(false);
          setFormData({
            classRoomId: 0,
            courseId: 0,
            timeSlotId: 0,
            lecturerId: 0,
            studentIds: [],
            singleSlot: true
          });
        }
      } catch (err) {
        const error = err as Error;
        console.error('Error creating classroom:', error);

        alert(error.message);
      }
    }

    if (modalMode === MODAL_TYPES.EDIT_MODE) {
      try {
        const response = await updateTimeSlots(formData, selectedId);

        if (response) {
          fetchClassRoutines();
          setShowCreateModal(false);
          setFormData({
            classRoomId: 0,
            courseId: 0,
            timeSlotId: 0,
            lecturerId: 0,
            studentIds: [],
            singleSlot: true
          });
        }
      } catch (err) {
        const error = err as Error;

        alert(error.message);
      }
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
    <section className="overflow-auto fg-1">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center my-4x">
          <h2>Class Routine</h2>

          <div className="d-flex">
            {isAdmin && (
              <button
                onClick={() => {
                  setFormData({
                    classRoomId: 0,
                    courseId: 0,
                    timeSlotId: 0,
                    lecturerId: 0,
                    studentIds: [],
                    singleSlot: true
                  });

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
        <div className="table-wrapper mb-12x">
          <table className="common-table">
            <thead>
              <tr>
                <th>Id</th>
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
              {filteredClasses.length > 0 ? (
                <>
                  {filteredClasses.map((classRoutine) => {
                    const {
                      id,
                      timeSlot: { day, startTime, endTime },
                      lecturer: { fullName },
                      course: { name, code },
                      classroom: { name: roomName }
                    } = classRoutine;

                    // set boolean takeattendanceavailable if time slot day is in next 7 days starting today
                    const currentDate = new Date();
                    const nextSevenDays = new Date(currentDate);
                    nextSevenDays.setDate(currentDate.getDate() + 7);
                    const classDate = new Date(day);
                    const takeAttendanceAvailable = classDate >= currentDate && classDate <= nextSevenDays;

                    return (
                      <tr className="class-routine" key={classRoutine.id}>
                        <td>{id}</td>
                        <td>{code}</td>
                        <td>{name}</td>
                        <td>{day}</td>
                        <td>{startTime}</td>
                        <td>{endTime}</td>
                        <td>{roomName}</td>
                        <td>{fullName}</td>
                        {isTeacher && takeAttendanceAvailable && (
                          <>
                            <Button
                              className="mt-1x"
                              onClick={() => {
                                setSelectedId(+classRoutine.id);

                                toggleAttendanceModal();
                              }}
                            >
                              Take attendance
                            </Button>
                          </>
                        )}

                        {isStudent && (
                          <>
                            <Button className="mt-1x" onClick={toggleCommentModal}>
                              Add Comment
                            </Button>

                            <AddCommentModal
                              handleClose={toggleCommentModal}
                              show={showCommentModal}
                              classRoutineId={classRoutine.id}
                              callback={() => undefined}
                            />
                          </>
                        )}

                        {isAdmin && (
                          <>
                            <Button
                              className="btn mt-1x"
                              onClick={() => {
                                setModalMode(MODAL_TYPES.EDIT_MODE);

                                setFormData({
                                  classRoomId: classRoutine.classroom.id,
                                  courseId: classRoutine.course.id,
                                  timeSlotId: classRoutine.timeSlot.id,
                                  lecturerId: classRoutine.lecturer.id,
                                  studentIds: classRoutine.students.map((student) => student.id),
                                  singleSlot: true
                                });

                                setSelectedId(+classRoutine.id);

                                toggleCreateModal();
                              }}
                            >
                              Edit
                            </Button>

                            <AddCommentModal
                              handleClose={toggleCommentModal}
                              show={showCommentModal}
                              classRoutineId={classRoutine.id}
                              callback={() => undefined}
                            />
                          </>
                        )}
                      </tr>
                    );
                  })}
                  <SaveAttendanceModal
                    handleClose={toggleAttendanceModal}
                    show={showAttendanceModal}
                    classRoutine={classes.find((classRoutine) => classRoutine.id === selectedId) ?? classes[0]}
                  />
                </>
              ) : null}
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
          mode={modalMode}
        />
      </div>
    </section>
  );
};

export default Timetable;
