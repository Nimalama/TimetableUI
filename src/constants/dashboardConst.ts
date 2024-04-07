import { FiBook, FiBookOpen, FiClock, FiHome, FiLink2, FiSettings, FiUser } from 'react-icons/fi';
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
    title: 'Lectures',
    subTitle: 'lectures',
    tabNumber: DASHBOARD_TAB_INDICES.LECTURES,
    icon: FiBookOpen,
    link: '/lectures'
  },
  {
    title: 'Tutors',
    subTitle: 'tutors',
    tabNumber: DASHBOARD_TAB_INDICES.TUTORS,
    icon: FiUser,
    link: '/tutors'
  },
  {
    title: 'Rooms',
    subTitle: 'rooms',
    tabNumber: DASHBOARD_TAB_INDICES.ROOMS,
    icon: FiLink2,
    link: '/classrooms'
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
    title: 'Settings',
    subTitle: 'settings',
    tabNumber: DASHBOARD_TAB_INDICES.SETTINGS,
    icon: FiSettings,
    link: '/settings'
  }
];
