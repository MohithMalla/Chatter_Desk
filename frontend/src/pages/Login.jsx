import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatterDeskLogo from './ChatterDeskLogo';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);
      const user = res.data.user;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', res.data.token);

      setUser(user);
      setRole(user.role);

      const destination = user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
      navigate(destination);

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4 " style={{ maxWidth: '400px', width: '100%',backgroundColor:"#343a40" }}>
        <div className="mb-4 d-flex flex-column align-items-center">
  <ChatterDeskLogo />
  
</div>
        <h3 className="mt-2 text-light mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 text-center" role="alert">
            {error}
          </div>
        )}

        {role && (
          <div className="alert alert-info mt-3 text-center">
            You are logged in as <strong>{role}</strong>
          </div>
        )}

        <div className="text-center mt-3">
          <a href="/register" className="text-decoration-none">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
}
