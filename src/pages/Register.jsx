import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";



export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
            🚀 Join Us
          </h1>
          <p style={{ color: "#666", marginTop: 0.5 }}>Create your account</p>

          {error && (
            <div className="error-message" style={{ marginTop: "1.5rem" }}>
              ⚠️ {error}
            </div>
          )}

          <input
            placeholder="👤 Full Name"
            value={form.name}
            onChange={e =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />

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
            placeholder="🔐 Password (min 6 chars)"
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
            {loading ? "🔄 Creating..." : "✓ Register"}
          </button>
        </form>

        <div style={{
          padding: "0 2.5rem 2rem 2.5rem",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          marginTop: "1.5rem"
        }}>
          <p style={{ marginTop: "1rem", marginBottom: 0 }}>
            Already have an account?{" "}
            <Link to="/login" className="form-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}