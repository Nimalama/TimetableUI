import { Link } from 'react-router-dom';
import { DASHBOARD_NAV_TABS } from '../constants/dashboardConst';

const DefaultDashboard = () => {
  const listing = DASHBOARD_NAV_TABS.filter((dash) => dash.title !== 'Dashboard');

  return (
    <section className="default-dash">
      <div className="wrapper">
        {listing.map((item) => (
          <Link className="default-dash__item" to={item.link}>
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DefaultDashboard;
