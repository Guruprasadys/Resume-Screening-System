import re
from PyPDF2 import PdfReader

def extract_resume_data(file_path):
    """Extract name, email, phone, and skills from a PDF resume."""
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""

    # Extract email and phone
    email = re.findall(r'\S+@\S+', text)
    phone = re.findall(r'\+?\d[\d -]{8,12}\d', text)

    # Simple skill extraction
    skill_keywords = ["Python", "Java", "C++", "Machine Learning", "React", "Node", "AWS", "MongoDB"]
    found_skills = [skill for skill in skill_keywords if skill.lower() in text.lower()]

    data = {
        "name": text.split('\n')[0][:50] if text else "Unknown",
        "email": email[0] if email else "N/A",
        "phone": phone[0] if phone else "N/A",
        "skills": found_skills,
        "total_skills": len(found_skills),
    }
    return data
