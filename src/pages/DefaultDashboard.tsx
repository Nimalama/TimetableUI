import CourseOverview from '../components/misc/CourseOverview';
import CoursesList from '../components/misc/CoursesList';
import { courses } from '../constants/consts';
import useDashboardContext from '../hooks/useChallengesDashboardContext';

const DefaultDashboard = () => {
  const { isStudent } = useDashboardContext();
  return (
    <section className="default-dash">
      <div className="container">
        {!isStudent ? <CoursesList /> : null}
        <CourseOverview courses={courses} isInnerDashboard />
      </div>
    </section>
  );
};

export default DefaultDashboard;
