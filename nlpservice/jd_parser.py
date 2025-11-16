def match_skills(resumes, job_description):
    """Simple skill matching based on common keywords."""
    job_lower = job_description.lower()
    results = []

    for resume in resumes:
        skills = resume.get("skills", [])
        matched = [s for s in skills if s.lower() in job_lower]
        score = round(len(matched) / len(skills) * 100, 2) if skills else 0

        results.append({
            "name": resume.get("name", "Unknown"),
            "match_score": score,
            "matched_skills": matched
        })

    return results
