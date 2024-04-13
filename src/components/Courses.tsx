// Courses.tsx
import React, { useEffect, useState } from 'react';
import { createCourse, deleteCourse, getCourses, updateCourse } from '../services/courseServices';
import { CourseInterface, CoursePayloadInterface } from '../interfaces/commonInterfaces';
import CommonRemoveModal from './modals/CommonRemoveModal';
import CreateCourseModal from './modals/CreateCoursesModal';
import { MODAL_TYPES } from '../constants/consts';
import useDashboardContext from '../hooks/useChallengesDashboardContext';

const Courses: React.FC = () => {
  const { isAdmin } = useDashboardContext();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [payload, setPayload] = useState<CoursePayloadInterface>({
    code: '',
    name: '',
    credits: null
  });

  const [modalMode, setModalMode] = useState(MODAL_TYPES.CREATE_MODE);

  useEffect(() => {
    fetchCourses();
  }, []);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses(); // Replace with your API endpoint
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async () => {
    if (modalMode === MODAL_TYPES.CREATE_MODE) {
      try {
        const response = await createCourse(payload);

        if (response) {
          fetchCourses();
          toggleCreateModal();
          setPayload({
            name: '',
            code: '',
            credits: 0
          });
        }
      } catch (error) {
        console.error('Error creating classroom:', error);
      }
    }

    if (modalMode === MODAL_TYPES.EDIT_MODE) {
      try {
        const response = await updateCourse(payload, selectedId);

        if (response) {
          fetchCourses();
          toggleCreateModal();
          setPayload({
            name: '',
            code: '',
            credits: 0
          });
        }
      } catch (error) {
        console.error('Error creating classroom:', error);
      }
    }
  };

  const removeCourse = async (classroomId: number) => {
    // Add your API call here
    try {
      const response = await deleteCourse(classroomId);

      if (response) {
        fetchCourses();
        toggleDeleteModal();
        setSelectedId(0);
      }
    } catch (error) {
      console.error('Error deleting classroom:', error);
    }
  };

  return (
    <section className="container">
      <div className="d-flex justify-content-between my-2x">
        <h2>Courses</h2>
        <div>
          {isAdmin ? (
            <button
              onClick={() => {
                setModalMode(MODAL_TYPES.CREATE_MODE);

                setPayload({
                  name: '',
                  code: '',
                  credits: 0
                });

                toggleCreateModal();
              }}
              className="btn btn--primary btn--sm"
            >
              Create Course
            </button>
          ) : null}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="common-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.credits}</td>

                {isAdmin ? (
                  <td>
                    <button
                      className="btn btn--teritiary btn--sm mr-2x"
                      onClick={() => {
                        setModalMode(MODAL_TYPES.EDIT_MODE);
                        setSelectedId(+course.id);
                        setPayload({
                          code: course.code,
                          name: course.name,
                          credits: course.credits
                        });

                        toggleCreateModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn--danger btn--sm"
                      onClick={() => {
                        setSelectedId(+course.id);
                        toggleDeleteModal();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CommonRemoveModal
        title="Delete Classroom"
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        handleClick={removeCourse}
        selectedId={selectedId}
      />

      <CreateCourseModal
        show={showCreateModal}
        handleClose={toggleCreateModal}
        data={payload}
        setData={setPayload}
        handleSubmit={handleSubmit}
        mode={modalMode}
      />
    </section>
  );
};

export default Courses;
