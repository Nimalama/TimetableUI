import CourseOverview from '../components/misc/CourseOverview';
import CoursesList from '../components/misc/CoursesList';
import { courses } from '../constants/consts';

const DefaultDashboard = () => {
  return (
    <section className="default-dash">
      <div className="container">
        <CoursesList />
        <CourseOverview courses={courses} isInnerDashboard />
      </div>
    </section>
  );
};

export default DefaultDashboard;
