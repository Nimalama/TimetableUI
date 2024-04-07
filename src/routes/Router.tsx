import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import NotFound from '../components/commons/NotFound';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Register from '../components/Register';
import { DASHBOARD, DASHBOARD_WITH_PARAM, HOME, LOGIN, SIGNUP } from '../constants/routes';
import PrivateRoute from './PrivateRoute';
import DashboardContextProvider from '../context/DashboardContext';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGNUP} element={<Register />} />
        <Route path="*" element={<NotFound />} />

        <Route
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route
            path={DASHBOARD}
            element={
              <DashboardContextProvider>
                <Dashboard />
              </DashboardContextProvider>
            }
          />
          <Route
            path={DASHBOARD_WITH_PARAM}
            element={
              <DashboardContextProvider>
                <Dashboard />
              </DashboardContextProvider>
            }
          />
          <Route path={HOME} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
