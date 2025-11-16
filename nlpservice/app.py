from flask import Flask, request, jsonify
from resume_parser import extract_resume_data
import requests
import tempfile
import os

app = Flask(__name__)

@app.route("/parse", methods=["POST"])
def parse_resume():
    data = request.get_json()
    ipfs_hash = data.get("ipfs_hash")

    if not ipfs_hash:
        return jsonify({"error": "No IPFS hash provided"}), 400

    try:
        # Download resume from IPFS
        ipfs_url = f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"
        response = requests.get(ipfs_url, timeout=15)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch file from IPFS"}), 500

        # Save file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            tmp_file.write(response.content)
            temp_path = tmp_file.name

        # Parse resume
        parsed_data = extract_resume_data(temp_path)

        # Cleanup temp file
        os.remove(temp_path)

        # Mock match score (or implement your real logic)
        parsed_data["match_score"] = round(len(parsed_data.get("skills", [])) * 10, 2)
        parsed_data["ipfs_hash"] = ipfs_hash

        return jsonify(parsed_data)

    except Exception as e:
        print("❌ Error in NLP parse:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("✅ NLP Service Running on port 8000")
    app.run(host="0.0.0.0", port=8000)
