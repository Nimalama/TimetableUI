import { useGoogleLogin } from "@react-oauth/google";
import {
  GoogleAuthResponseInterface,
  ObjectKeysInterface,
} from "../interfaces/commonInterfaces";
import { GOOGLE_PARAMS } from "../constants/authConsts";
import { getTokenResponseFromGoogleAuthCode } from "../services/authServices";

interface GoogleLoginResponseInterface {
  authuser: string;
  code: string;
  hd: string;
  prompt: string;
  scope: string;
}

const GoogleSignInButton: React.FC = () => {
  // const navigate = useNavigate();

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

      if (response.hd === "parewalabs.com") {
        try {
          const data = {
            code: response.code,
            grant_type: "authorization_code", // grant_type needs to be authorization_code for auth-code login flow
            client_id: GOOGLE_PARAMS.GOOGLE_LOGIN_CLIENT_ID,
            client_secret: GOOGLE_PARAMS.GOOGLE_LOGIN_CLIENT_SECRET,
            redirect_uri: window.location.origin,
          };

          const tokenResponse: GoogleAuthResponseInterface =
            await getTokenResponseFromGoogleAuthCode(data);

          console.debug(tokenResponse);

          // const userInfo = await axios.get(
          //   "https://www.googleapis.com/oauth2/v1/userinfo",
          //   {
          //     headers: {
          //       Authorization: `Bearer ${tokenResponse.access_token}`,
          //     },
          //   }
          // );

          // const loginResponse = await handleGoogleLoginRequest({
          //   token: tokenResponse.id_token,
          //   email: userInfo.data.email,
          // });

          // if (loginResponse) {
          //   // addAccessTokensToCookies(loginResponse.token);

          //   navigate(HOME);
          // }
        } catch (err) {
          handleFailureGoogleLogin(err);
        }
      } else {
        // showToast({
        //   message: "Please login using Parewa Labs account",
        //   toastState: TOAST_STATES.ERROR,
        // });
      }
    },
    flow: "auth-code",
  });

  return (
    <button title='Cancel' className='ml-3x' onClick={login}>
      Sign in with Google 🚀
    </button>
  );
};

export default GoogleSignInButton;
