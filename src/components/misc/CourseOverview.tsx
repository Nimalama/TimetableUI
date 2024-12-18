import React from 'react';

interface Course {
  coursePic: string;
  name: string;
  description: string;
}

interface Props {
  courses: Course[];
  isInnerDashboard?: boolean;
}

const CourseOverview: React.FC<Props> = ({ courses, isInnerDashboard = false }) => {
  const sectionClassName = isInnerDashboard ? 'module-overview module-overview--inner' : 'module-overview';

  const wrapper = !isInnerDashboard ? 'container' : '';

  return (
    <section className={sectionClassName}>
      <div className={wrapper}>
        <h2>Courses Overview</h2>

        <div className="course-list">
          {courses.map((course) => (
            <div className="course" key={course.name}>
              <img src={course.coursePic} alt={course.name} />
              <div className="course-info">
                <h3>{course.name}</h3>
                <p>{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
