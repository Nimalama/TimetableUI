import { useState } from 'react';
import DefaultNavbar from './commons/DefaultNavbar';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
    setIsLoading(false);
  };
  return (
    <>
      <DefaultNavbar />

      <div className="d-flex flex-column align-items-center justify-content-center mt-10x">
        <h3>Forgot Password</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-6x">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="inputEmailAddress2"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading || email.length < 1} className="btn btn--primary w-100">
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;