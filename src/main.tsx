import './assets/sass/style.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import { IconContext } from 'react-icons';

import { GOOGLE_PARAMS } from './constants/authConsts.ts';
import Router from './routes/Router.tsx';

const container = document.getElementById('root');
const root = container && createRoot(container); // createRoot(container!) if you use TypeScript

root?.render(
  <GoogleOAuthProvider clientId={GOOGLE_PARAMS.GOOGLE_LOGIN_CLIENT_ID}>
    <IconContext.Provider value={{ size: '20px' }}>
      <Router />
    </IconContext.Provider>
  </GoogleOAuthProvider>
);
