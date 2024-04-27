import CourseOverview from '../components/misc/CourseOverview';
import Footer from '../components/misc/Footer';
import DefaultNavbar from '../components/commons/DefaultNavbar';
import { courses } from '../constants/consts';
import { Parallax } from 'react-parallax';
import { building } from '../assets/images';
import { LOGIN } from '../constants/routes';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className="position-relative">
      <DefaultNavbar classes="default-navbar--transparent" />
      <Parallax blur={{ min: -15, max: 15 }} bgImage={building} bgImageAlt="University building" strength={-200}>
        <div className="content fs-h2main" onClick={() => navigate(LOGIN)}>
          Know More. Do More.
        </div>
        <div className="parallax-image" />
      </Parallax>
      <CourseOverview courses={courses} />
      <Footer />
    </section>
  );
};

export default HomePage;
