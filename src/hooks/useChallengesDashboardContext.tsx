import { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { DashboardContextInterface } from '../interfaces/commonInterfaces';

const useDashboardContext = (): DashboardContextInterface => useContext(DashboardContext);

export default useDashboardContext;
