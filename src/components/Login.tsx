import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SIGNUP } from '../constants/routes';

import DefaultAuthComponent from './commons/DefaultAuthComponent';
import DefaultNavbar from './commons/DefaultNavbar';
import GoogleSignInButton from './GoogleSignInButton';
import { loginUserWithEmail } from '../services/authServices';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();

  const passwordElemRef = useRef<HTMLInputElement | null>(null);

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setErrorMessage('');
    setUserCredentials({ ...userCredentials, [name]: value.trim() });
  };

  // Post api request for login
  const login = async () => {
    try {
      setIsLoading(true);

      const userData = await loginUserWithEmail({ email: userCredentials.email, password: userCredentials.password });

      if (userData) {
        localStorage.setItem('userInformation', JSON.stringify(userData));

        navigate('/home');
      }
    } catch (err) {
      const errorResponse = err as Error;

      const errorsObj = errorResponse.message;

      setErrorMessage(errorsObj);
    } finally {
      setIsLoading(false);
    }
  };

  // Function for handling submit button for login section
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    login();
  };

  const handleShowHidePassword = (): void => {
    const inputType = showPassword ? 'password' : 'text';

    if (passwordElemRef?.current) {
      passwordElemRef.current.setAttribute('type', inputType);
    }

    setShowPassword(!showPassword);
  };

  const isButtonDisabled =
    isLoading || userCredentials.email === '' || userCredentials.password === '' || userCredentials.password.length < 8;

  return (
    <>
      <DefaultNavbar />
      <div className="auth-form">
        <DefaultAuthComponent />

        <div className="register-form">
          <div className="form-wrapper">
            <GoogleSignInButton />
            <div className="divider text-center my-4x">or</div>
            <div className="d-md-flex justify-content-between align-items-end mb-4x">
              <h3>Sign In</h3>
              <p className="m-0">
                Don't have an account? <Link to={SIGNUP}>Sign Up</Link>
              </p>
            </div>

            {errorMessage.length > 0 ? <div className="error-message">{errorMessage}</div> : null}

            <form onSubmit={handleSubmit} className="mt-2x">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmailAddress2"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group form-group--password">
                <label htmlFor="exampleInputPassword1" className="label--with-icon">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Enter your password"
                  ref={passwordElemRef}
                  value={userCredentials.password}
                  onChange={handleChange}
                />
                <div onClick={handleShowHidePassword} className="password-icon">
                  {!showPassword ? <FiEye /> : <FiEyeOff />}
                </div>
              </div>

              <div className="form-group mt-4x">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <button
                disabled={isButtonDisabled}
                type="submit"
                title="Sign Up"
                className="btn btn--primary btn--block mt-2x d-flex justify-content-center"
                id="sign-up-with-email"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
