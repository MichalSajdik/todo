import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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

      router.push('/todos');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      {error && <span>{error}</span>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
