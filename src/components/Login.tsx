import React, { ChangeEvent, useRef, useState } from "react";
import DefaultNavbar from "./commons/DefaultNavbar";
import DefaultAuthComponent from "./commons/DefaultAuthComponent";
import { Link } from "react-router-dom";
import { SIGNUP } from "../constants/routes";
import GoogleSignInButton from "./GoogleSignInButton";

const Login = () => {
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value.trim() });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <DefaultNavbar />
      <div className='auth-form'>
        <DefaultAuthComponent />

        <div className='register-form'>
          <div className='form-wrapper'>
            <GoogleSignInButton />
            <div className='divider my-2x'>or</div>
            <div className='d-md-flex justify-content-between align-items-end mb-4x'>
              <h3>Sign In</h3>
              <p className='m-0'>
                Don't have an account? <Link to={SIGNUP}>Sign Up</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email</label>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  id='inputEmailAddress2'
                  aria-describedby='emailHelp'
                  placeholder='Enter your email'
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='exampleInputPassword1'
                  className='label--with-icon'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  id='inputPassword'
                  placeholder='Enter your password'
                  ref={passwordRef}
                  value={userCredentials.password}
                  onChange={handleChange}
                />
                <div
                  // onClick={handleShowHidePassword}
                  className='login-form__password-icon'
                >
                  {/* {!showPassword ? <FiEye /> : <FiEyeOff />} */}
                </div>
              </div>
              <button
                // disabled={isButtonDisabled}
                type='submit'
                title='Sign Up'
                className='btn btn--primary btn--block mt-6x d-flex justify-content-center'
                id='sign-up-with-email'
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
