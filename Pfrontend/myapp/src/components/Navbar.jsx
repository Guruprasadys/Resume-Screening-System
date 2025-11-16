import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    backgroundColor:"brown",
    color: "#fff",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "20px",
  };

  const linkContainerStyle = {
    display: "flex",
    gap: "20px",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease, transform 0.2s ease",
  };

  return (
    <nav style={navStyle}>
      <h1 style={titleStyle}>Decentralized Resume Screening</h1>
      <div style={linkContainerStyle}>
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.color = "#6b73ff";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
            e.target.style.transform = "scale(1)";
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/login"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.color = "#6b73ff";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
            e.target.style.transform = "scale(1)";
          }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.color = "#6b73ff";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
            e.target.style.transform = "scale(1)";
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
