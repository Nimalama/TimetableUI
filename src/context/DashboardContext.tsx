import { createContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardContextInterface } from '../interfaces/commonInterfaces';
import { DASHBOARD_TAB_INDICES } from '../enums/enums';

export const DashboardContext = createContext<DashboardContextInterface>({} as DashboardContextInterface);

interface AppContextProvider {
  children: JSX.Element;
}

const DashboardContextProvider = ({ children }: AppContextProvider): JSX.Element => {
  const { category } = useParams();

  console.log({ category });

  const getCurrentTabIndexValue = (): number => {
    switch (category) {
      case 'home':
        return DASHBOARD_TAB_INDICES.DASHBOARD;

      case 'lectures':
        return DASHBOARD_TAB_INDICES.LECTURES;

      case 'tutors':
        return DASHBOARD_TAB_INDICES.TUTORS;

      case 'rooms':
        return DASHBOARD_TAB_INDICES.ROOMS;

      case 'courses':
        return DASHBOARD_TAB_INDICES.COURSES;

      case 'timetable':
        return DASHBOARD_TAB_INDICES.TIMETABLE;

      case 'settings':
        return DASHBOARD_TAB_INDICES.SETTINGS;

      default:
        return DASHBOARD_TAB_INDICES.DASHBOARD;
    }
  };

  // State goes here
  const [menuBar, setMenuBar] = useState(false);
  const [activeTab, setActiveTab] = useState(getCurrentTabIndexValue());

  console.log('activeTab', activeTab);

  const value = useMemo<DashboardContextInterface>(
    () => ({
      menuBar,
      setMenuBar,
      activeTab,
      setActiveTab
    }),
    [menuBar, activeTab]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export default DashboardContextProvider;
