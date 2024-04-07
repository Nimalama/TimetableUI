import Dashboard from '../components/Dashboard';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      {/* <Navigation /> */}
      <Dashboard />
      {children}
    </>
  );
};

export default PrivateRoute;
