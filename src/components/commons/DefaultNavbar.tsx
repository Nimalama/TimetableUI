import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '../../assets/images';
import { HOME, LOGIN, SIGNUP } from '../../constants/routes';

const DefaultNavbar = () => {
  //get pathname
  const location = useLocation();
  const loginClass = classNames('default-navbar-links__items', {
    active: location.pathname === LOGIN
  });

  return (
    <section className="default-navbar">
      <div className="container d-flex justify-content-between">
        <div className="brand-logo">
          <Link to={HOME}>
            <img src={Logo} alt="Brand Logo" />
          </Link>
        </div>

        <ul className="default-navbar-links">
          <li className={loginClass}>
            <Link to={LOGIN}>Login</Link>
          </li>
          <li>
            <Link to={SIGNUP} className="btn btn--primary btn--sm">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DefaultNavbar;
