import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Register = () => {
  const router = useRouter();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/auth', { action: 'register', username, password });

      const token = response.data.token;

      localStorage.setItem('token', token);

      router.push('/todos');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
