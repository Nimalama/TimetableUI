import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useDashboardContext from '../../hooks/useChallengesDashboardContext';
import { smallLogo } from '../../assets/images';

const MobileTopBar = ({ children }: { children: JSX.Element }) => {
  const { setMenuBar } = useDashboardContext();

  return (
    <div className="dashboard__mobile-nav d-md-none">
      <div className="dashboard__mobile-nav__home">
        <FiMenu size={24} className="pointer" onClick={() => setMenuBar(true)} />
        <Link to="/home">
          <div className="dashboard__mobile-nav__image">
            <img src={smallLogo} alt="Logo Mobile" />
          </div>
        </Link>
        <p className="mb-0">Scheduler</p>
      </div>
      {children}
    </div>
  );
};

export default MobileTopBar;
