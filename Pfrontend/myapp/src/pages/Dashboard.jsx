// File: src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import ResumeUpload from "../components/ResumeUpload.jsx";
import CandidateCard from "../components/CandidateCard.jsx";
import API from "../api/api.js";

function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [gpa, setGpa] = useState("");
  const [experience, setExperience] = useState("");
  const [candidate, setCandidate] = useState(null);

  const token = localStorage.getItem("token") || "";

  const skillOptions = [
    "Python", "React", "Node.js", "Java", "C++", "AWS", "Azure", "Docker",
    "Kubernetes", "MongoDB", "MySQL", "TensorFlow"
  ];

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {

      window.location.href = "/login";
    }
  }, [token]);

  // Add skill to selected list
  const addSkill = () => {
    if (!selectedSkill) return alert("Select a skill first!");
    if (!skills.includes(selectedSkill)) setSkills([...skills, selectedSkill]);
    else alert("Skill already added!");
  };

  // Handle resume upload
  const handleUpload = async (resumeData) => {
    if (!skills.length || !gpa || !experience) {
      return alert("Please add skills, GPA, and experience first!");
    }

    try {
      // Send uploaded resume + job requirements to /match
      const body = { skills, gpa, experience, resume: resumeData };
      const res = await API.post("/match", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const matchData = res.data?.data;

      if (!matchData) return alert("No candidate data received from backend.");

      // Ensure skills is array
      if (typeof matchData.skills === "string") {
        matchData.skills = matchData.skills.split(",").map(s => s.trim());
      }

      setCandidate(matchData);
      alert("✅ Resume processed successfully!");
    } catch (err) {
      console.error("❌ Error matching resume:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to process resume. Check backend logs.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Inline styles
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#ffe6f0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000dff",
  };

  const logoutButtonStyle = {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const logoutHover = (e) => (e.target.style.backgroundColor = "#e63939");
  const logoutLeave = (e) => (e.target.style.backgroundColor = "#ff4d4d");

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px",
    marginBottom: "24px",
  };

  const headingStyle = { fontSize: "20px", fontWeight: "600", marginBottom: "16px" };
  const flexStyle = { display: "flex", gap: "12px", marginBottom: "12px" };

  const inputStyle = {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    fontSize: "16px",
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
  };

  const inputFocus = (e) => (e.target.style.boxShadow = "0 0 8px rgba(0, 13, 255, 0.3)");
  const inputBlur = (e) => (e.target.style.boxShadow = "none");

  const addButtonStyle = {
    padding: "10px 16px",
    backgroundColor: "#000dff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  const addHover = (e) => {
    e.target.style.backgroundColor = "#6b73ff";
    e.target.style.transform = "translateY(-2px)";
  };

  const addLeave = (e) => {
    e.target.style.backgroundColor = "#000dff";
    e.target.style.transform = "translateY(0)";
  };

  const selectedSkillsStyle = { fontSize: "14px", marginBottom: "12px" };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Intelligent Resume Screening</h1>
        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={logoutHover}
          onMouseLeave={logoutLeave}
        >
          Logout
        </button>
      </div>

      <div style={cardStyle}>
        <h2 style={headingStyle}>Enter Job Requirements</h2>

        <div style={flexStyle}>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          >
            <option value="">Select a Skill</option>
            {skillOptions.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={addSkill}
            style={addButtonStyle}
            onMouseEnter={addHover}
            onMouseLeave={addLeave}
          >
            Add
          </button>
        </div>

        <p style={selectedSkillsStyle}>
          <strong>Selected Skills:</strong> {skills.length ? skills.join(", ") : "None"}
        </p>

        <div style={flexStyle}>
          <input
            type="number"
            placeholder="GPA"
            step="0.1"
            min="0"
            max="10"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />
          <input
            type="number"
            placeholder="Experience (years)"
            min="0"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />
        </div>
      </div>

      <ResumeUpload onUpload={handleUpload} />

      {candidate && (
        <div style={{ width: "100%", maxWidth: "800px", marginTop: "24px" }}>
          <CandidateCard candidate={candidate} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
