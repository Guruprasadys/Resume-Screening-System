// models/Resume.js
import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  name: { type: String, default: "N/A" },
  email: { type: String, default: "N/A" },
  skills: { type: [String], default: [] },
  ipfsHash: { type: String },
  match_score: { type: Number, default: 0 }, // <- use match_score
});

export default mongoose.model("Resume", ResumeSchema);
