import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", formData);
      alert("✅ Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg, pink, lightblue)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const headingStyle = {
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputStyle = {
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    padding: "12px",
    backgroundColor: "#000dff",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  };

  const footerStyle = {
    marginTop: "20px",
    color: "#666",
    fontSize: "14px",
  };

  const linkStyle = {
    color: "#000dff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  };

  // Hover and focus handlers
  const cardHover = (e) => (e.currentTarget.style.transform = "translateY(-8px)");
  const cardLeave = (e) => (e.currentTarget.style.transform = "translateY(0px)");

  const inputFocus = (e) => {
    e.target.style.boxShadow = "0 0 10px rgba(0, 13, 255, 0.3)";
    e.target.style.borderColor = "#000dff";
  };
  const inputBlur = (e) => {
    e.target.style.boxShadow = "none";
    e.target.style.borderColor = "#ccc";
  };

  const buttonHover = (e) => {
    e.target.style.backgroundColor = "#6b73ff";
    e.target.style.transform = "translateY(-2px)";
  };
  const buttonLeave = (e) => {
    e.target.style.backgroundColor = "#000dff";
    e.target.style.transform = "translateY(0)";
  };

  const linkHover = (e) => (e.target.style.color = "#6b73ff");
  const linkLeave = (e) => (e.target.style.color = "#000dff");

  return (
    <div style={containerStyle}>
      <div style={cardStyle} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
        <h2 style={headingStyle}>Create Account</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={buttonHover}
            onMouseLeave={buttonLeave}
          >
            Register
          </button>
        </form>
        <p style={footerStyle}>
          Already have an account?{" "}
          <a
            href="/login"
            style={linkStyle}
            onMouseEnter={linkHover}
            onMouseLeave={linkLeave}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
