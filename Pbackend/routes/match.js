import express from "express";
import Resume from "../models/Resume.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { skills: jobSkills, gpa, experience, resume } = req.body;

    if (!jobSkills || !jobSkills.length || !resume) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find candidate resume in MongoDB
    const candidate = await Resume.findById(resume._id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Ensure candidate skills is an array
    const candidateSkills = Array.isArray(candidate.skills)
      ? candidate.skills
      : [];

    // Match job skills vs candidate skills
    const matchedSkills = candidateSkills.filter((skill) =>
      jobSkills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
    );

    const skillMatchScore =
      jobSkills.length > 0
        ? Math.round((matchedSkills.length / jobSkills.length) * 100)
        : 0;

    // ✅ Include the correct IPFS hash field
    const candidateData = {
      _id: candidate._id,
      name: candidate.name,
      email: candidate.email,
      skills: candidate.skills,
      match_score: skillMatchScore,
      ipfs_hash: candidate.ipfsHash, // ✅ consistent with schema
    };

    console.log("✅ Final Match Response:", candidateData);
    res.json({ data: candidateData });
  } catch (err) {
    console.error("❌ Match error:", err);
    res.status(500).json({ error: "Failed to calculate match score" });
  }
});

export default router;
