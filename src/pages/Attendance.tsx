import AdminAttendanceComponent from '../components/attendance/AdminAttendanceComponent';
import NonAdminAttendanceComponent from '../components/attendance/NonAdminAttendanceComponent';
import useDashboardContext from '../hooks/useChallengesDashboardContext';

const AttendanceComponent = () => {
  const { isAdmin } = useDashboardContext();

  return isAdmin ? <AdminAttendanceComponent /> : <NonAdminAttendanceComponent />;
};

export default AttendanceComponent;
