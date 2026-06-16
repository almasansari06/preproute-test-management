import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand">Preproute Test Admin</Link>
      <button onClick={logout} className="btn btn-outline">Logout</button>
    </header>
  );
};

export default Navbar;
