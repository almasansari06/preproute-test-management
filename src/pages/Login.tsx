import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!userId.trim() || !password.trim()) {
      setError('User ID and password are required.');
      return;
    }
    try {
      setLoading(true);
      const res = await loginUser({ userId, password });
      if (res.success && res.data.token) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else setError(res.message || 'Login failed.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid login details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Enter your credentials to manage tests.</p>
        {error && <div className="alert error">{error}</div>}
        <label>User ID</label>
        <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        <label className="checkbox"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Store token in localStorage</label>
        <button className="btn btn-primary full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </main>
  );
};

export default Login;
