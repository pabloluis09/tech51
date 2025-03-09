import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/api/users/login', { email, password });
      setMessage('Login successful');
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="login">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={loginHandler} className="mb-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
