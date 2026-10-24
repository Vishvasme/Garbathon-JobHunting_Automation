import json
import os
from flask import Flask, render_template, jsonify
from google import genai
from google.genai import types

app = Flask(__name__)

# Fallback to hardcoded key if environment variable is missing in PowerShell
api_key = os.environ.get("GEMINI_API_KEY", "AQ.Ab8RN6I8YUD5FTr_NxvZXSPM2l9ludpNo3CVRuonllUAf4ASIw")
client = genai.Client(api_key=api_key)

SYSTEM_PROMPT = """
You are an AI Email Classifier and Security Engine for job seekers.

Analyze the input array of emails and evaluate each email:
1. Determine application status: "Applied", "Interview", "Rejected", "Offer", or "Suspicious/Scam".
2. Check for Scam Signals:
   - Mark is_scam = true if the sender uses a free domain (@gmail.com/@yahoo.com) for corporate offers, requests training/registration fees, or asks for personal identification prematurely.
   - List specific reasons in scam_reasons.
3. Check Follow-up Requirement:
   - Mark needs_followup = true if status is "Applied" and the email date is older than 7 days (relative to current date 2026-10-24).
4. Interview Prep:
   - If status is "Interview", provide 2 concise interview preparation bullet points.

Return strictly a valid JSON array matching the specified keys.
"""

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/analyze')
def analyze():
    json_path = "sample_inbox.json"
    if not os.path.exists(json_path):
        return jsonify({"error": "sample_inbox.json not found"}), 404

    with open(json_path, "r", encoding="utf-8") as f:
        inbox_data = json.load(f)

    prompt = f"Analyze these sample job seeker emails:\n{json.dumps(inbox_data, indent=2)}"

    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            response_mime_type="application/json",
            temperature=0.1
        )
    )

    return jsonify(json.loads(response.text))

if __name__ == "__main__":
    app.run(debug=True, port=5000)