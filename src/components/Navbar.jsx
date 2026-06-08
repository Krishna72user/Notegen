import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/')
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 style={{ cursor: "pointer", margin: 0 }}>📝 Note Generator</h2>
      </Link>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              📚 Dashboard
            </Link>
            <Link to='/' onClick={handleLogout} className="nav-link">
              🚪 Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              👤 Login
            </Link>
            <Link to="/register" className="nav-link">
              📝 Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}