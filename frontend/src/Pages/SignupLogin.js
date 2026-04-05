import React, { useEffect } from 'react';
import Login from '../Components/Login';
import SignUp from '../Components/Signup';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Signup_login.module.css';

const Signup_login = ({ onLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleSuccessfulLogin = (user) => {
    onLogin(user); // Call the onLogin function passed from App.js
    navigate('/'); // Navigate to the homepage after successful login
  };

  return (
    <div className={styles.container}>
      {location.pathname === '/' || location.pathname === '/login' ? (
        <Login onSuccessfulLogin={handleSuccessfulLogin} />
      ) : (
        location.pathname === '/signup' && <SignUp />
      )}
    </div>
  );
};

export default Signup_login;
