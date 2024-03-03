import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { DB_ROUTES } from '@/pages/lib/db';
import { ROUTES } from '@/pages/lib/helpers';

const Register = () => {
  const router = useRouter();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/auth', { action: 'register', username, password });

      const token = response.data.token;

      localStorage.setItem('token', token);

      router.push(DB_ROUTES.TODOS);
    } catch (error) {
      console.error('Error during registration:', error);
      // @ts-ignore
      const errorMessage = error?.response?.data?.error || 'Internal server error';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
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
        <button data-testid='register-button' onClick={handleRegister}>Register</button>
      </div>
      {error && <div><span>{error}</span></div>}
      <div>
        <a href={ROUTES.LOGIN}>Log in</a>
      </div>
    </div>
  );
};

export default Register;
