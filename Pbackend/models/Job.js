import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  skillsRequired: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
