import { useEffect, useState } from 'react';
import { CourseInterface } from '../../interfaces/commonInterfaces';
import { getCourses } from '../../services/courseServices';
import { API_BASE_URL, COURSE_STATUS, FAKE_COURSES } from '../../constants/consts';
import { SearchInput } from './SearchInput';
import useDashboardContext from '../../hooks/useChallengesDashboardContext';

const CoursesList = () => {
  const { isStudent, userInformation } = useDashboardContext();

  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses(); // Replace with your API endpoint
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  let filteredCourses = [...courses, ...FAKE_COURSES].filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isStudent) {
    filteredCourses = filteredCourses.filter((data) => data.category === userInformation?.category);
  }

  if (selectedStatus !== '') {
    filteredCourses = filteredCourses.filter((data) => data.status === selectedStatus);
  }

  if (selectedCategory !== '') {
    filteredCourses = filteredCourses.filter((data) =>
      data.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  return (
    <section className="module-overview bg-white">
      <div className="module-overview__header">
        <h2>Available Courses </h2>

        <div className="d-flex-md ">
          {/* need a filter to select category */}
          {!isStudent ? (
            <div className="form-group mb-1x mr-4x d-flex align-items-center">
              <select
                className="form-control ml-2x-md py-2x"
                value={selectedCategory ?? ''}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
          ) : (
            <div className="form-group mb-1x mr-4x d-flex align-items-center">
              <select
                className="form-control ml-2x-md py-2x"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value={''}>Select Status</option>
                <option value={COURSE_STATUS.UNENROLLED}>Unenrolled</option>
                <option value={COURSE_STATUS.ENROLLED}>Enrolled</option>
                <option value={COURSE_STATUS.COMPLETED}>Completed</option>
              </select>
            </div>
          )}
          <SearchInput value={searchTerm} placeholder="search courses" handler={handleSearchTermChange} />
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="course-list">
          {filteredCourses.map((course) => (
            <div className="course" key={course.name}>
              <div className="course-list__image">
                <img
                  src={!course.coursePic?.startsWith('http') ? `${API_BASE_URL}${course.coursePic}` : course.coursePic}
                  alt={course.name}
                />
              </div>
              <div className="course-info">
                <h3>{course.name}</h3>
                <p>
                  {course.code} | {course.credits} | {course.category}
                </p>
                <p>{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-between py-4x">No results found</div>
      )}
    </section>
  );
};

export default CoursesList;
