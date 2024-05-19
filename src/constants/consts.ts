import { COURSE_STATUS } from '../../enums/enums';
export const MODAL_TYPES = {
  CREATE_MODE: 'create',
  EDIT_MODE: 'edit'
};

export const FAKE_COURSES = [
  {
    coursePic: 'https://3rdwavemedia.com/demo-images/slides/maker-module-1.jpg',
    name: 'Introduction to HTML',
    description: 'A beginner-friendly course covering the fundamentals of HTML markup language.',
    code: 'ITH_2323',
    credits: 120,
    category: 'Bachelors',
    status: COURSE_STATUS.COMPLETED 
  },
  {
    coursePic: 'https://3rdwavemedia.com/demo-images/slides/maker-module-2.jpg',
    name: 'Advanced HTML Techniques',
    description: 'Explore advanced HTML concepts such as semantic markup and HTML5 features.',
    code: 'AHT_2000',
    credits: 120,
    category: 'Masters',
    status: COURSE_STATUS.COMPLETED
  },
  {
    coursePic: 'https://3rdwavemedia.com/demo-images/slides/maker-module-3.jpg',
    name: 'Mastering SCSS',
    description: 'Learn the ins and outs of SCSS (Sassy CSS) for efficient and maintainable styling.',
    code: 'MSCSS_2402',
    credits: 120,
    category: 'Masters',
    status: COURSE_STATUS.COMPLETED
  },
  {
    coursePic: 'https://3rdwavemedia.com/demo-images/slides/maker-module-4.jpg',
    name: 'SCSS for Responsive Design',
    description: 'Discover how to use SCSS to create responsive and adaptive web designs.',
    code: 'SRD_2402',
    credits: 120,
    category: 'Masters',
    status: COURSE_STATUS.COMPLETED
  },
  {
    coursePic: 'https://3rdwavemedia.com/demo-images/slides/maker-module-5.jpg',
    name: 'Building Modular CSS Architecture',
    description: 'Explore strategies for building modular and scalable CSS architectures using SCSS.',
    code: 'BMCSSA_2122',
    credits: 120,
    category: 'Bachelors',
    status: COURSE_STATUS.COMPLETED
  },
  {
    coursePic: 'https://3rdwavemedia.com/demo-images/slides/maker-module-6.jpg',
    name: 'Optimizing CSS Performance',
    description: 'Learn techniques for optimizing CSS performance to enhance website loading speed.',
    code: 'OCSSP_99',
    credits: 120,
    category: 'Bachelors',
    status: COURSE_STATUS.COMPLETED
  }
];

export const API_BASE_URL = 'http://localhost:6173/';
