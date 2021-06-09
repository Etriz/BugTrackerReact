import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const emptyForm = { username: '', password: '' };
  const [error, setError] = useState();
  const [login, setLogin] = useState(emptyForm);

  const logUserIn = (e) => {
    e.preventDefault();
    if (!login.username) {
      setError('username');
    } else if (!login.password) {
      setError('password');
    } else {
      console.log('login');
      clearForm();
      history.push('/');
    }
  };
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setLogin(emptyForm);
  };

  return (
    <div className="container">
      <div className="formArea">
        <h1>Login</h1>
        <form onSubmit={logUserIn}>
          <label htmlFor="usernameInput">
            Username
            <span className="error">{error === 'username' ? ' - USERNAME IS REQUIRED' : null}</span>
            <input
              type="text"
              name="username"
              className="formInput"
              id="usernameInput"
              placeholder="Username"
              value={login.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="passwordInput">
            Password
            <span className="error">{error === 'password' ? ' - PASSWORD IS REQUIRED' : null}</span>
            <input
              type="password"
              name="password"
              className="formInput"
              id="passwordInput"
              placeholder="Password"
              value={login.password}
              onChange={handleChange}
            />
          </label>
          <button className="btn" type="submit" id="btnLogin">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
