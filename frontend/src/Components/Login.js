import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styles
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../api'; 

const Login = ({ onSuccessfulLogin }) => { // Accept onSuccessfulLogin as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Login button clicked!", email, password); 
    setError(''); // Clear previous errors

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // Destructure token, uuid, and isAdmin from response data
      const { token, uuid, isAdmin } = response.data;

      // Store token and user details in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', uuid);
      localStorage.setItem('isAdmin', isAdmin);
      console.log('Login successful', response.data);

      // Notify parent component of successful login and pass user data
      onSuccessfulLogin({ email, uuid, isAdmin });

      // Redirect to the home page or any other route
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        const msg = err.response.data.message.toLowerCase();
        if (msg.includes('not exist')) {
          setError('User does not exist. Please sign up first.');
        } else if (msg.includes('password')) {
          setError('Incorrect password. Please try again.');
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container-login">
      <h1 className='login-h1'>Login</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          className='login-input'
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='login-input'
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input className="sub" type="submit" value="Login" />
        {error && <div className="error-login">{error}</div>}
        <h3 className='login-h3'>Don’t have an account?</h3>
        <a className='login-anchor' href="/signup">Create a new account</a>
      </form>
    </div>
  );
};

export default Login;
