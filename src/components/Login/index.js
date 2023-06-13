import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import JokesPage from '../Home';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    setUsername("")
    setPassword("")
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 container-fluid">
      <div>
        {isLoggedIn ? (
          <JokesPage handleLogout={handleLogout} />
        ) : (
          <div className="form-container">
            <h1 className="head">
              Login form
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder='User Id'
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='Password'
                  required
                />
              </div>
              <div className='text-center'>
              <button type="submit" className="btn btn-primary nuto">Login</button>
              </div>
              {/* ERROR MESSAGE */}
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

