import json
import os
from google import genai
from google.genai import types

# Initialize Gemini Client (reads GEMINI_API_KEY from environment)
client = genai.Client()

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

Return strictly a valid JSON array containing objects with these exact keys:
[
  {
    "id": 1,
    "sender": "",
    "subject": "",
    "status": "",
    "is_scam": false,
    "scam_reasons": [],
    "needs_followup": false,
    "interview_prep_notes": ""
  }
]
"""

def process_job_hunt_inbox(json_path):
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return

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

    return json.loads(response.text)

if __name__ == "__main__":
    print("Processing inbox emails with Gemini API...")
    processed_results = process_job_hunt_inbox("sample_inbox.json")
    print(json.dumps(processed_results, indent=2))