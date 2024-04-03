import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../constants/routes";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(LOGIN);
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
