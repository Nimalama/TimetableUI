import { createContext, useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardContextInterface, UserInformationInterface } from '../interfaces/commonInterfaces';
import { DASHBOARD_TAB_INDICES } from '../enums/enums';
import { LOGIN } from '../constants/routes';

export const DashboardContext = createContext<DashboardContextInterface>({} as DashboardContextInterface);

interface AppContextProvider {
  children: JSX.Element;
}

const DashboardContextProvider = ({ children }: AppContextProvider): JSX.Element => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [userInformation, setUserInformation] = useState<UserInformationInterface | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const [isUserProcessing, setIsUserProcessing] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('userInformation');
    const parsedUser = JSON.parse(user as string);

    if (parsedUser) {
      setUserInformation(parsedUser);
      setIsAdmin(parsedUser.userType === 'admin');
      setIsTeacher(parsedUser.userType === 'teacher');
      setIsStudent(parsedUser.userType === 'student');

      setIsUserProcessing(true)
    } else {
      navigate(LOGIN);
    }
  }, []); // Run only once on component mount

  useEffect(() => {
    // Update active tab based on category
    setActiveTab(getCurrentTabIndexValue());
  }, [category]); // Re-run whenever category changes

  const getCurrentTabIndexValue = (): number => {
    switch (category) {
      case 'home':
        return DASHBOARD_TAB_INDICES.DASHBOARD;
      case 'tutors':
        return DASHBOARD_TAB_INDICES.TUTORS;
      case 'rooms':
        return DASHBOARD_TAB_INDICES.ROOMS;
      case 'courses':
        return DASHBOARD_TAB_INDICES.COURSES;
      case 'timetable':
        return DASHBOARD_TAB_INDICES.TIMETABLE;
      default:
        return DASHBOARD_TAB_INDICES.DASHBOARD;
    }
  };

  // State goes here
  const [menuBar, setMenuBar] = useState(false);
  const [activeTab, setActiveTab] = useState(getCurrentTabIndexValue());

  const value = useMemo<DashboardContextInterface>(
    () => ({
      menuBar,
      setMenuBar,
      activeTab,
      setActiveTab,
      userInformation,
      isAdmin,
      isStudent,
      isTeacher,
      isUserProcessing
    }),
    [menuBar, activeTab, userInformation, isAdmin, isStudent, isTeacher,isUserProcessing]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export default DashboardContextProvider;
