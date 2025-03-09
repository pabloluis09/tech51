import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/users', { name, email, password, isAdmin });
    setUsers([...users, data]);
  };

  return (
    <div className="user-management">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <form onSubmit={addUser} className="mb-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
        <label className="flex items-center">
          <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="mr-2" />
          Admin
        </label>
        <button type="submit" className="btn">Add User</button>
      </form>
      <ul className="list">
        {users.map(user => (
          <li key={user._id} className="list-item">{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
