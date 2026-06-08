import { useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import api from "../services/api";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [generatedPDFs, setGeneratedPDFs] = useState([]);

  const generate = async () => {
    setError("");
    setSuccessMessage("");

    if (!title.trim() || !prompt.trim()) {
      setError("Title and prompt are required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/notes/generate",
        { title, prompt },
        { responseType: "blob" }
      );

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(file);
      const timestamp = new Date().toLocaleString();

      const newPDF = {
        id: Date.now(),
        title: title.trim(),
        url,
        timestamp,
        size: (file.size / 1024).toFixed(2)
      };

      setGeneratedPDFs([newPDF, ...generatedPDFs]);
      setSuccessMessage(`PDF "${title}" generated successfully!`);
      
      setTitle("");
      setPrompt("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to generate notes");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (pdf) => {
    const a = document.createElement("a");
    a.href = pdf.url;
    a.download = `${pdf.title}.pdf`;
    a.click();
  };

  const deletePDF = (id) => {
    const pdf = generatedPDFs.find(p => p.id === id);
    if (pdf) {
      window.URL.revokeObjectURL(pdf.url);
    }
    setGeneratedPDFs(generatedPDFs.filter(p => p.id !== id));
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>✨ AI Note Generator</h1>

        <div className="glass" style={{ padding: "2rem", marginBottom: "2rem" }}>
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              ✓ {successMessage}
            </div>
          )}

          <input
            placeholder="📝 Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <textarea
            rows={10}
            placeholder="📄 Enter your prompt here... (describe what you want in the notes)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />

          {loading ? (
            <Loader />
          ) : (
            <button 
              onClick={generate}
              style={{
                width: "100%",
                marginTop: "1.5rem",
                fontSize: "1.1rem",
                fontWeight: "700"
              }}
            >
              🚀 Generate PDF
            </button>
          )}
        </div>

        {generatedPDFs.length > 0 && (
          <div className="glass" style={{ padding: "2rem" }}>
            <h2 style={{ marginBottom: "1.5rem", marginTop: 0 }}>
              📚 Generated PDFs ({generatedPDFs.length})
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {generatedPDFs.map((pdf) => (
                <div
                  key={pdf.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    backdrop: "blur(10px)",
                    border: "1px solid rgba(102, 126, 234, 0.2)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.7)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, color: "#1a1a1a", fontSize: "1.1rem" }}>
                      📄 {pdf.title}
                    </h3>
                    <p style={{ margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }}>
                      {pdf.timestamp} • {pdf.size} KB
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      onClick={() => downloadPDF(pdf)}
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        padding: "10px 20px",
                        marginTop: 0
                      }}
                    >
                      ⬇️ Download
                    </button>
                    <button
                      onClick={() => deletePDF(pdf.id)}
                      style={{
                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        padding: "10px 20px",
                        marginTop: 0
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}