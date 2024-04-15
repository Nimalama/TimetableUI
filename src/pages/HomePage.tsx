import CourseOverview from '../components/misc/CourseOverview';
import Footer from '../components/misc/Footer';
import DefaultNavbar from '../components/commons/DefaultNavbar';
import { courses } from '../constants/consts';

const HomePage = () => {
  return (
    <>
      <DefaultNavbar />
      <CourseOverview courses={courses} />
      {/* <Carousel items={courses} /> */}
      <Footer />
    </>
  );
};

export default HomePage;
