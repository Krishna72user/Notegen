export default function Loader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <span style={{ fontWeight: 600, color: "#667eea" }}>Generating...</span>
    </div>
  );
}