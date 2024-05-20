import CourseOverview from '../components/misc/CourseOverview';
import CoursesList from '../components/misc/CoursesList';
import { FAKE_COURSES } from '../constants/consts';
import useDashboardContext from '../hooks/useChallengesDashboardContext';

const DefaultDashboard = () => {
  const { isStudent } = useDashboardContext();
  return (
    <section className="default-dash">
      <div className="container">
        {!isStudent ? <CoursesList /> : null}
        <CourseOverview courses={FAKE_COURSES} isInnerDashboard />
      </div>
    </section>
  );
};

export default DefaultDashboard;
