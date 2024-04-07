// Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CLASSROOMS, COURSES, HOME } from '../constants/routes';

const Navigation: React.FC = () => {
  return (
    <section className="navbar">
      <nav className="container">
        <ul>
          <li>
            <Link to={HOME}>Home</Link>
          </li>
          <li>
            <Link to={COURSES}>Courses</Link>
          </li>
          <li>
            <Link to={CLASSROOMS}>Classrooms</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navigation;
