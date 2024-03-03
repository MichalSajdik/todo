import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ROUTES } from '@/pages/lib/helpers';

const Login = () => {
  const router = useRouter();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth', { action: 'login', username, password });

      const token = response.data.token;

      localStorage.setItem('token', token);

      router.push(ROUTES.TODOS);
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <input
          data-testid='username-input'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          data-testid='password-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} data-testid='login-button'>Login</button>
      </div>
      {error && <div><span>{error}</span></div>}
      <div>
        <a href={ROUTES.REGISTER}>Register</a>
      </div>
    </div>
  );
};

export default Login;
