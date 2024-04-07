import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { LOGIN } from '../constants/routes';
import { UserInformationInterface } from '../interfaces/commonInterfaces';
import { logout } from '../utility/helper';
import { DASHBOARD_NAV_TABS } from '../constants/dashboardConst';
import { DASHBOARD_TAB_INDICES } from '../enums/enums';
import Courses from './Courses';
import Classrooms from './Classrooms';
import useDashboardContext from '../hooks/useChallengesDashboardContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const [userInfo, setUserInfo] = useState<UserInformationInterface | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { activeTab } = useDashboardContext();

  useEffect(() => {
    const user = localStorage.getItem('userInformation');

    const parsedUser = JSON.parse(user as string);

    if (!user) {
      navigate(LOGIN);
    }

    setUserInfo(parsedUser);
    setIsAdmin(parsedUser.userType === 'admin');
  }, []);

  console.log(isAdmin);

  return (
    <section className="d-flex">
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar__header">
          <p className="dashboard__sidebar__header__title">TimeTable</p>
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
        <div className="dashboard__sidebar__footer m-2x p-2x">
          <p className="dashboard__sidebar__footer__title">{userInfo?.fullName}</p>
          <p className="dashboard__sidebar__footer__subtitle">{userInfo?.email}</p>
        </div>
        <button onClick={logout} className="btn mx-2x my-4x p-2x">
          Logout{' '}
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
      return <>home</>;

    case 'lectures':
      return <>lectures</>;

    case 'settings':
      return <>setting</>;

    case 'timetable':
      return <>table</>;

    case 'tutors':
      return <>tutors</>;

    default:
      return <>hh</>;
  }
};
