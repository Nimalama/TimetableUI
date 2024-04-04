import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from '../components/commons/NotFound';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Register from '../components/Register';
import { HOME, LOGIN, SIGNUP } from '../constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Dashboard />} />

        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGNUP} element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
