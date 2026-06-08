import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const { checkUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/login", form);
      // Clear logout flag on successful login
      localStorage.removeItem("notegen_logged_out");
      await checkUser();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div className="glass" style={{ width: "100%", maxWidth: "400px" }}>
        <form onSubmit={submit} style={{ padding: "2.5rem", margin: 0 }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", marginTop: 0 }}>
            👋 Welcome Back
          </h1>
          <p style={{ color: "#666", marginTop: 0.5 }}>Sign in to continue</p>

          {error && (
            <div className="error-message" style={{ marginTop: "1.5rem" }}>
              ⚠️ {error}
            </div>
          )}

          <input
            placeholder="📧 Email"
            type="email"
            value={form.email}
            onChange={e =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="🔐 Password"
            value={form.password}
            onChange={e =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <button 
            disabled={loading}
            style={{ width: "100%", marginTop: "1.5rem", fontSize: "1rem" }}
          >
            {loading ? "🔄 Logging in..." : "✓ Login"}
          </button>
        </form>

        <div style={{
          padding: "0 2.5rem 2rem 2.5rem",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          marginTop: "1.5rem"
        }}>
          <p style={{ marginTop: "1rem", marginBottom: 0 }}>
            Don't have an account?{" "}
            <Link to="/register" className="form-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}