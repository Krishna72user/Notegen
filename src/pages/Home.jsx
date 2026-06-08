import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: "3rem" }}>
        {/* Hero Section */}
        <div className="glass" style={{ padding: "4rem 3rem", marginBottom: "3rem", textAlign: "center" }}>
          <h1 style={{ marginTop: 0, fontSize: "3rem" }}>
            ✨ Welcome to NoteGen
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#333", marginBottom: "1.5rem" }}>
            Transform your ideas into beautifully formatted PDF notes powered by AI
          </p>
          
          {!user && (
            <p style={{ fontSize: "1rem", color: "#666" }}>
              <Link to="/register" style={{ color: "#667eea", fontWeight: "600", textDecoration: "none" }}>
                Sign up
              </Link>
              {" "} or {" "}
              <Link to="/login" style={{ color: "#667eea", fontWeight: "600", textDecoration: "none" }}>
                login
              </Link>
              {" "} to get started
            </p>
          )}
          
          {user && (
            <p style={{ fontSize: "1rem", color: "#666" }}>
              <Link to="/dashboard" style={{ color: "#667eea", fontWeight: "600", textDecoration: "none" }}>
                Go to Dashboard
              </Link>
              {" "} to create your first note
            </p>
          )}
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>🎯 Features</h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem"
          }}>
            {/* Feature 1 */}
            <div className="glass" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
              <h3 style={{ marginTop: 0 }}>AI-Powered</h3>
              <p style={{ color: "#666", marginBottom: 0 }}>
                Leverage advanced AI to generate comprehensive, well-structured notes from your prompts
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📄</div>
              <h3 style={{ marginTop: 0 }}>PDF Generation</h3>
              <p style={{ color: "#666", marginBottom: 0 }}>
                Automatically convert your notes into professionally formatted PDF documents
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💾</div>
              <h3 style={{ marginTop: 0 }}>Storage & History</h3>
              <p style={{ color: "#666", marginBottom: 0 }}>
                Keep track of all your generated PDFs and download them anytime you need
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚡</div>
              <h3 style={{ marginTop: 0 }}>Fast & Reliable</h3>
              <p style={{ color: "#666", marginBottom: 0 }}>
                Generate high-quality notes in seconds with our optimized AI engine
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎨</div>
              <h3 style={{ marginTop: 0 }}>Beautiful Design</h3>
              <p style={{ color: "#666", marginBottom: 0 }}>
                Modern, intuitive interface designed for seamless user experience
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
              <h3 style={{ marginTop: 0 }}>Secure & Private</h3>
              <p style={{ color: "#666", marginBottom: 0 }}>
                Your data is encrypted and protected with industry-standard security
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="glass" style={{ padding: "3rem", marginBottom: "3rem" }}>
          <h2 style={{ textAlign: "center", marginTop: 0 }}>🔧 How It Works</h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginTop: "2rem"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>1️⃣</div>
              <h3 style={{ marginTop: 0 }}>Sign Up</h3>
              <p style={{ color: "#666" }}>Create your free account in seconds</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>2️⃣</div>
              <h3 style={{ marginTop: 0 }}>Enter Your Prompt</h3>
              <p style={{ color: "#666" }}>Describe what you want in your notes</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>3️⃣</div>
              <h3 style={{ marginTop: 0 }}>Generate PDF</h3>
              <p style={{ color: "#666" }}>Let AI create your notes instantly</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>4️⃣</div>
              <h3 style={{ marginTop: 0 }}>Download & Share</h3>
              <p style={{ color: "#666" }}>Download or share your PDF anywhere</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "4rem", paddingBottom: "2rem" }}>
          <p style={{ color: "#999" }}>© 2024 NoteGen. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
