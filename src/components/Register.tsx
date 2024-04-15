import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN } from '../constants/routes';

import DefaultAuthComponent from './commons/DefaultAuthComponent';
import DefaultNavbar from './commons/DefaultNavbar';
import GoogleSignInButton from './GoogleSignInButton';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { signUpWithEmail } from '../services/authServices';

const Register = () => {
  const navigate = useNavigate();

  const passwordElemRef = useRef<HTMLInputElement | null>(null);

  const [userCredentials, setUserCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'Student'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setErrorMessage('');
    setUserCredentials({ ...userCredentials, [name]: value.trim() });
  };

  const signup = async () => {
    try {
      setIsLoading(true);

      const userData = await signUpWithEmail(userCredentials);

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

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // Handle form submission logic here
    signup();
  };

  const handleShowHidePassword = (): void => {
    const inputType = showPassword ? 'password' : 'text';

    if (passwordElemRef?.current) {
      passwordElemRef.current.setAttribute('type', inputType);
    }

    setShowPassword(!showPassword);
  };

  const isButtonDisabled =
    isLoading ||
    userCredentials.email === '' ||
    userCredentials.password === '' ||
    userCredentials.fullName === '' ||
    userCredentials.password.length < 8;

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
              <h3>Create Account</h3>
              <p className="m-0">
                Have an account? <Link to={LOGIN}>Sign In</Link>
              </p>
            </div>

            {errorMessage.length > 0 ? <div className="error-message">{errorMessage}</div> : null}

            <form onSubmit={handleSubmit} className="mt-2x">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  id="exampleInputfullName1"
                  aria-describedby="nameHelp"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  data-test-id="signup-full-name-input"
                />
              </div>

              {/* radio group for userType selection */}
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <div className="d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="userType"
                      id="student"
                      value="Student"
                      checked={userCredentials.userType === 'Student'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="student">
                      Student
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="userType"
                      id="teacher"
                      value="Teacher"
                      checked={userCredentials.userType === 'Teacher'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="teacher">
                      Teacher
                    </label>
                  </div>
                </div>
              </div>

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
                  data-test-id="signup-email-input"
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
                  data-test-id="signup-password-input"
                />
                <div onClick={handleShowHidePassword} className="password-icon">
                  {!showPassword ? <FiEye /> : <FiEyeOff />}
                </div>
              </div>
              <button
                disabled={isButtonDisabled}
                type="submit"
                title="Sign Up"
                className="btn btn--primary btn--block mt-6x d-flex justify-content-center"
                id="sign-up-with-email"
                data-test-id="signup-submit-button"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
