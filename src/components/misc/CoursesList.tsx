import { useEffect, useState } from 'react';
import { CourseInterface } from '../../interfaces/commonInterfaces';
import { getCourses } from '../../services/courseServices';
import { API_BASE_URL } from '../../constants/consts';
import { SearchInput } from './SearchInput';
import useDashboardContext from '../../hooks/useChallengesDashboardContext';

const CoursesList = () => {
  const { isAdmin } = useDashboardContext();

  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  let filteredCourses = courses.filter((data) => data.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (selectedCategory !== '') {
    filteredCourses = filteredCourses.filter((data) =>
      data.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  return (
    <section className="module-overview bg-white">
      <div className="d-flex-md align-items-center justify-content-between">
        <h2>Available Courses </h2>
        {isAdmin && (
          <div className="d-flex-md ">
            {/* need a filter to select category */}
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
            <SearchInput value={searchTerm} placeholder="search courses" handler={handleSearchTermChange} />
          </div>
        )}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="course-list">
          {filteredCourses.map((course) => (
            <div className="course" key={course.name}>
              <div className="course-list__image">
                <img
                  src={
                    course.coursePic
                      ? `${API_BASE_URL}${course.coursePic}`
                      : 'https://3rdwavemedia.com/demo-images/slides/maker-module-2.jpg'
                  }
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
