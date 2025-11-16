import React from "react";

export default function CandidateCard({ candidate }) {
  if (!candidate) return null;

  const cardStyle = {
    background: "#ffffff",
    padding: "20px 25px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
  };

  const cardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
  };

  // Safely access candidate fields
  const name = candidate.name || "N/A";
  const skills = Array.isArray(candidate.skills)
    ? candidate.skills.join(", ")
    : "N/A";
  const score = candidate.match_score ?? 0;

  // ✅ Fix: include ipfsHash (camelCase)
  const ipfsHash =
    candidate.ipfs_hash ||
    candidate.ipfsHash ||
    candidate.resume?.ipfs_hash ||
    candidate.resumeHash ||
    null;

  return (
    <div style={cardStyle} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
      <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#333" }}>
        {name}
      </h3>
      <p style={{ fontSize: "14px", color: "#555" }}>Skills: {skills}</p>
      <p style={{ fontSize: "16px", fontWeight: "bold", color: "#00b894" }}>
        Score: {score}%
      </p>

      {ipfsHash ? (
        <a
          href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: "14px",
            color: "#0984e3",
            textDecoration: "underline",
            display: "block",
            marginTop: "10px",
          }}
        >
          View Resume (IPFS)
        </a>
      ) : (
        <p style={{ fontSize: "13px", color: "#888", marginTop: "10px" }}>
         
        </p>
      )}
    </div>
  );
}
