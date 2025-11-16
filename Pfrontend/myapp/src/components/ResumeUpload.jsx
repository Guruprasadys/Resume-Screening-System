import React, { useState } from "react";
import API from "../api/api.js";

export default function ResumeUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose a PDF first!");

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);

    try {
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const resumeInfo = res.data.data;
      if (!resumeInfo) throw new Error("No resume data returned from backend.");

      if (onUpload) onUpload(resumeInfo);

      alert("✅ Resume uploaded successfully!");
      setFile(null); // reset file input
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
      alert(
        err.response?.data?.error ||
        "Upload failed. Check backend or NLP service logs."
      );
    } finally {
      setLoading(false);
    }
  };

  // Inline Styles
  const containerStyle = {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    margin: "24px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    transition: "transform 0.3s ease",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
    alignItems: "center",
  };

  const fileInputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    width: "100%",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const fileInputFocus = (e) => (e.target.style.boxShadow = "0 0 8px rgba(0, 13, 255, 0.3)");
  const fileInputBlur = (e) => (e.target.style.boxShadow = "none");

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#000dff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    width: "100%",
  };

  const buttonHover = (e) => {
    e.target.style.backgroundColor = "#6b73ff";
    e.target.style.transform = "translateY(-2px)";
  };
  const buttonLeave = (e) => {
    e.target.style.backgroundColor = "#000dff";
    e.target.style.transform = "translateY(0)";
  };

  const fileNameStyle = {
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={fileInputStyle}
          onFocus={fileInputFocus}
          onBlur={fileInputBlur}
        />
        {file && <span style={fileNameStyle}>Selected: {file.name}</span>}
        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
          onMouseEnter={buttonHover}
          onMouseLeave={buttonLeave}
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </form>
    </div>
  );
}
