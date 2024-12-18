import { FiBook, FiClock, FiHash, FiHome, FiLink2, FiUser } from 'react-icons/fi';
import { NavigationTabInterface } from '../interfaces/commonInterfaces';
import { DASHBOARD_TAB_INDICES } from '../enums/enums';

export const DASHBOARD_NAV_TABS: NavigationTabInterface[] = [
  {
    title: 'Dashboard',
    subTitle: 'home',
    tabNumber: DASHBOARD_TAB_INDICES.DASHBOARD,
    icon: FiHome,
    link: '/home'
  },
  {
    title: 'Rooms',
    subTitle: 'rooms',
    tabNumber: DASHBOARD_TAB_INDICES.ROOMS,
    icon: FiLink2,
    link: '/rooms'
  },
  {
    title: 'Courses',
    subTitle: 'courses',
    tabNumber: DASHBOARD_TAB_INDICES.COURSES,
    icon: FiBook,
    link: '/courses'
  },
  {
    title: 'Timetable',
    subTitle: 'timetable',
    tabNumber: DASHBOARD_TAB_INDICES.TIMETABLE,
    icon: FiClock,
    link: '/timetable'
  },
  {
    title: 'Attendance',
    subTitle: 'attendance',
    tabNumber: DASHBOARD_TAB_INDICES.ATTENDANCE,
    icon: FiHash,
    link: '/attendance'
  },
  {
    title: 'Profile',
    subTitle: 'profile',
    tabNumber: DASHBOARD_TAB_INDICES.PROFILE,
    icon: FiUser,
    link: '/profile'
  }
];
