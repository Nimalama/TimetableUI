import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import NotFound from '../components/commons/NotFound';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Register from '../components/Register';
import { DASHBOARD_WITH_PARAM, FORGOT_PASSWORD, HOME, LOGIN, RESET_PASSWORD, SIGNUP } from '../constants/routes';
import PrivateRoute from './PrivateRoute';
import DashboardContextProvider from '../context/DashboardContext';
import HomePage from '../pages/HomePage';
import ForgetPassword from '../components/ForgetPassword';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGNUP} element={<Register />} />
        <Route path={FORGOT_PASSWORD} element={<ForgetPassword />} />
        <Route path={RESET_PASSWORD} element={<ForgetPassword />} />
        <Route path="*" element={<NotFound />} />

        <Route
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route
            path={DASHBOARD_WITH_PARAM}
            element={
              <DashboardContextProvider>
                <Dashboard />
              </DashboardContextProvider>
            }
          />
          <Route path={HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
