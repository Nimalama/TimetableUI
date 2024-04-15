import CourseOverview from '../components/misc/CourseOverview';
import { courses } from '../constants/consts';

const DefaultDashboard = () => {
  return (
    <section className="default-dash">
      <div className="container">
        <CourseOverview courses={courses} isInnerDashboard />
      </div>
    </section>
  );
};

export default DefaultDashboard;
