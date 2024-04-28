// Courses.tsx
import React, { useEffect, useState } from 'react';
import { createCourse, deleteCourse, getCourses, updateCourse } from '../services/courseServices';
import { CourseInterface, CoursePayloadInterface } from '../interfaces/commonInterfaces';
import CommonRemoveModal from './modals/CommonRemoveModal';
import CreateCourseModal from './modals/CreateCoursesModal';
import { API_BASE_URL, MODAL_TYPES } from '../constants/consts';
import useDashboardContext from '../hooks/useChallengesDashboardContext';
import CoursesList from './misc/CoursesList';

const Courses: React.FC = () => {
  const { isAdmin } = useDashboardContext();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [payload, setPayload] = useState<CoursePayloadInterface>({
    code: '',
    name: '',
    credits: null,
    category: null,
    coursePic: null,
    description: null
  });

  const [modalMode, setModalMode] = useState(MODAL_TYPES.CREATE_MODE);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses(); // Replace with your API endpoint
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
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
            credits: null,
            coursePic: null,
            category: null,
            description: null
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
            credits: null,
            coursePic: null,
            category: null,
            description: null
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

  if (!isAdmin) {
    return (
      <section className="container">
        <CoursesList />
      </section>
    );
  }

  return (
    <section className="container">
      <div className="d-flex justify-content-between my-4x">
        <h2>Courses</h2>
        <div>
          <button
            onClick={() => {
              setModalMode(MODAL_TYPES.CREATE_MODE);

<<<<<<< HEAD
              setPayload({
                name: '',
                code: '',
                credits: null,
                coursePic: null,
                category: null,
                description: null
              });
=======
                setPayload({
                  name: '',
                  code: '',
                  credits: null,
                  coursePic: null,
                  category: null,
                  description: null
                });
>>>>>>> 6ffa940099922b15ad1cc74fabb1e30253b36adb

              toggleCreateModal();
            }}
            className="btn btn--primary btn--sm ml-8x"
          >
            Create
          </button>
        </div>
      </div>
<<<<<<< HEAD

      <div className="table-wrapper">
        <table className="common-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Category</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.code}</td>
                <td className="d-flex align-items-center">
                  {course.coursePic?.length && (
                    <div className="course-image mr-2x">
                      <img src={`${API_BASE_URL}${course.coursePic}`} alt="Course Image" />
                    </div>
                  )}
                  {course.name}
                </td>
                <td>{course.credits}</td>
                <td>{course.category}</td>

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
                          credits: course.credits,
                          category: course.category,
                          coursePic: null,
                          description: course.description
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
=======
      
      {isAdmin ? (
<div className="table-wrapper">
<table className="common-table">
<thead>
<tr>
<th>Course Code</th>
<th>Course Name</th>
<th>Credits</th>
<th>Category</th>
<th />
</tr>
</thead>
 
            <tbody>
              {courses.map((course) => (
<tr key={course.id}>
<td>{course.code}</td>
<td className="d-flex align-items-center">
                    {course.coursePic?.length && (
<div className="course-image mr-2x">
<img src={`${API_BASE_URL}${course.coursePic}`} alt="Course Image" />
</div>
                    )}
                    {course.name}
</td>
<td>{course.credits}</td>
<td>{course.category}</td>
 
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
                            credits: course.credits,
                            category: course.category,
                            coursePic: null,
                            description: course.description
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
      ) : null}
     
           
>>>>>>> 6ffa940099922b15ad1cc74fabb1e30253b36adb

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
