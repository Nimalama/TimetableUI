import { useGoogleLogin } from '@react-oauth/google';

import { GOOGLE_PARAMS } from '../constants/authConsts';
import { GoogleAuthResponseInterface, ObjectKeysInterface } from '../interfaces/commonInterfaces';
import { getTokenResponseFromGoogleAuthCode, signInWithGoogle } from '../services/authServices';
import { HOME } from '../constants/routes';
import { useNavigate } from 'react-router-dom';

interface GoogleLoginResponseInterface {
  authuser: string;
  code: string;
  hd: string;
  prompt: string;
  scope: string;
}

const GoogleSignInButton: React.FC = () => {
  const navigate = useNavigate();

  // Function for handling google login failure
  const handleFailureGoogleLogin = (data: unknown): void => {
    const error = data as ObjectKeysInterface;

    if (error?.error !== GOOGLE_PARAMS.INITIALIZATION_FAILED) {
      // showToast({
      //   message: "Unable to login using Google. Please try again",
      //   toastState: TOAST_STATES.ERROR,
      // });
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = codeResponse as GoogleLoginResponseInterface;

      try {
        const data = {
          code: response.code,
          grant_type: 'authorization_code', // grant_type needs to be authorization_code for auth-code login flow
          client_id: GOOGLE_PARAMS.GOOGLE_LOGIN_CLIENT_ID,
          client_secret: GOOGLE_PARAMS.GOOGLE_LOGIN_CLIENT_SECRET,
          redirect_uri: window.location.origin
        };

        const tokenResponse: GoogleAuthResponseInterface = await getTokenResponseFromGoogleAuthCode(data);

        const userData = await signInWithGoogle({
          idToken: tokenResponse.id_token,
          userType: 'Student'
        });

        if (userData) {
          localStorage.setItem('userInformation', userData.token);

          navigate(HOME);
        }
      } catch (err) {
        handleFailureGoogleLogin(err);
      }
    },
    flow: 'auth-code'
  });

  return (
    <button title="Cancel" className="btn btn--block btn--black" onClick={login}>
      Continue with Google 🚀
    </button>
  );
};

export default GoogleSignInButton;
