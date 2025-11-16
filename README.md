Intelligent Resume Screening System (MERN + NLP + Pinata Cloud)

An AI-powered resume screening system that automatically extracts skills from uploaded resumes, compares them with job job requirements selected by the recruiter, and generates a real-time match score.
Resumes are securely stored on Pinata Cloud (IPFS), and candidate results are displayed on a clean React dashboard.

This project helps companies automate candidate shortlisting, reduce manual effort, and improve accuracy.

📌 Features
✅ Resume Upload & Skill Extraction (AI/NLP)

Extracts skills automatically from PDF/DOCX resumes

Uses NLP-based keyword extraction

Stores parsed candidate profiles in MongoDB

✅ Dynamic Job Requirements Matching

Recruiter selects skills from dropdown

System compares selected skills with candidate skills

Generates accurate match score (0–100%)

✅ Pinata Cloud Storage (IPFS)

Resumes are uploaded to Pinata Cloud

Returns a permanent IPFS URL for secure storage

Resume accessible anytime in dashboard

✅ MERN Stack

Frontend: React + Axios

Backend: Node.js + Express

Database: MongoDB

Auth: JWT (Login / Protected Routes)

🏗️ Tech Stack
Component	Technology
Frontend	React, Axios
Backend	Node.js, Express
Database	MongoDB Atlas
File Storage	Pinata Cloud (IPFS)
Resume Parsing	NLP (Skills Extraction)
Authentication	JWT
