import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getTests, updateTest } from '../api/testApi';
import { Test } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTests = async () => {
    try {
      setLoading(true);
      setTests(await getTests());
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to fetch tests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTests(); }, []);

  const filteredTests = useMemo(() => tests.filter((test) =>
    `${test.name} ${test.subject} ${test.status}`.toLowerCase().includes(query.toLowerCase())
  ), [tests, query]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this test?')) return;
    try {
      await updateTest(id, { status: 'deleted' });
      setTests((prev) => prev.filter((test) => test.id !== id));
    } catch {
      alert('Delete API not provided. Mark-delete request failed.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="page-head">
          <div>
            <h1>Dashboard</h1>
            <p>Manage all created tests.</p>
          </div>
          <Link to="/tests/create" className="btn btn-primary">Create New Test</Link>
        </div>

        <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, subject or status..." />
        {loading && <p>Loading tests...</p>}
        {error && <div className="alert error">{error}</div>}

        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Subject</th><th>Status</th><th>Created</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <tr key={test.id}>
                  <td>{test.name}</td>
                  <td>{test.subject}</td>
                  <td><span className={`badge ${test.status === 'live' ? 'live' : 'draft'}`}>{test.status || 'draft'}</span></td>
                  <td>{test.created_at ? new Date(test.created_at).toLocaleDateString() : '-'}</td>
                  <td className="actions">
                    <button className="btn btn-light" onClick={() => navigate(`/tests/${test.id}/edit`)}>Edit</button>
                    <button className="btn btn-light" onClick={() => navigate(`/tests/${test.id}/preview`)}>View</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(test.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!loading && filteredTests.length === 0 && <tr><td colSpan={5}>No tests found.</td></tr>}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
