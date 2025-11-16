import express from "express";
import multer from "multer";
import fs from "fs";
import Resume from "../models/Resume.js";
import { uploadToIPFS } from "../config/pinata.js";
import axios from "axios";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    // Upload to IPFS
    const ipfsHash = await uploadToIPFS(filePath, fileName);
    console.log("✅ Uploaded to IPFS:", ipfsHash);

    // NLP parsing
    const nlpResponse = await axios.post(
      "http://127.0.0.1:8000/parse",
      { ipfs_hash: ipfsHash },
      { headers: { "Content-Type": "application/json" } }
    );

    const parsedData = nlpResponse.data;
    console.log("📄 Parsed resume data:", parsedData);

    // Store parsed skills and info
    const skills = parsedData.skills || [];

    // 🟢 Do not assign 100, keep 0 (real score calculated later)
    const match_score = 0;

    // 🟢 Use consistent field name `ipfsHash`
    const newResume = new Resume({
      name: parsedData.name || "N/A",
      email: parsedData.email || "N/A",
      skills,
      ipfsHash,
      match_score,
    });

    await newResume.save();

    // Remove uploaded file from temp folder
    fs.unlinkSync(filePath);

    res.json({ message: "Upload successful", data: newResume });
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
});

export default router;
