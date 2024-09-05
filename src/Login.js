import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const staticUsername = 'user1';
  const staticPassword = 'password1';

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === staticUsername && password === staticPassword) {
     
      localStorage.setItem('token', 'staticusertoken');
      navigate('/dashboard');
    } else {
      try {
        const response = await axios.post('http://localhost:5001/api/auth/login', {
          username,
          password,
        });

        localStorage.setItem('token', response.data.token);

        navigate('/dashboard');
      } catch (err) {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Video Application</h2>
      <h4>Log in</h4>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
