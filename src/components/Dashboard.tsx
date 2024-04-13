import { Link, useParams } from 'react-router-dom';

import { logout } from '../utility/helper';
import { DASHBOARD_NAV_TABS } from '../constants/dashboardConst';
import Courses from './Courses';
import Classrooms from './Classrooms';
import useDashboardContext from '../hooks/useChallengesDashboardContext';
import DefaultDashboard from '../pages/DefaultDashboard';
import Profile from '../pages/Profile';
import classNames from 'classnames';

const Dashboard = () => {
  const { category } = useParams();

  const { userInformation, menuBar } = useDashboardContext();

  const sidebarClass = classNames('dashboard__sidebar', { 'dashboard__sidebar--hidden': !menuBar });

  return (
    <section className="d-flex">
      <div className={sidebarClass}>
        <div className="dashboard__sidebar__header">
          <p className="dashboard__sidebar__header__title">Scheduler</p>
        </div>
        <ul className="dashboard__sidebar__navigation-desktop">
          {DASHBOARD_NAV_TABS.map((tab) => {
            return (
              <li className="item" key={`tab-${tab.subTitle}`}>
                <Link
                  to={{
                    pathname: `/${tab.subTitle}`
                  }}
                  title={tab.title}
                  className={'item__link'}
                >
                  <tab.icon size={20} />
                  <span>{tab.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* // display user name */}
        <div className="dashboard__sidebar__footer">
          <span className="dashboard__sidebar__footer__title">{userInformation?.fullName}</span>
          <span className="dashboard__sidebar__footer__subtitle">{userInformation?.email}</span>
        </div>
        <button onClick={logout} className="btn mx-2x my-4x p-2x">
          Logout
        </button>
      </div>

      <CurrentTabContent activeTab={category ?? ''} />
    </section>
  );
};

export default Dashboard;

const CurrentTabContent = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case 'courses':
      return <Courses />;

    case 'rooms':
      return <Classrooms />;

    case 'home':
      return <DefaultDashboard />;

    case 'lectures':
      return <>lectures</>;

    case 'settings':
      return <>setting</>;

    case 'timetable':
      return <>table</>;

    case 'tutors':
      return <>tutors</>;

    case 'profile':
      return <Profile />;

    default:
      return <>hh</>;
  }
};
