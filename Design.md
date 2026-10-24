# Job Hunt Autopilot — System Architecture & Design Specification (`DESIGN.md`)

## 1. Executive Summary
**Job Hunt Autopilot** is an AI-driven email triage and security defense system designed for job seekers navigating high-volume application workflows. Built for **Garbathon 2026**, the system ingests batch email payloads, performs real-time classification using Google's **Gemini 3.8 Flash** model, updates tracking statuses, flags fraudulent/scam offers with explicit threat justifications, and triggers overdue follow-up alerts.

---

## 2. System Architecture & Data Flow

┌─────────────────────────┐
│ Mock Inbox Payload      │
│  (sample_inbox.json)    │
└────────────┬────────────┘
│
▼
┌─────────────────────────┐
│ Flask Backend Server    │
│  (app.py / Python)      │
└────────────┬────────────┘
│
▼
┌─────────────────────────┐
│ Google GenAI SDK        │
│ (Gemini 3.8 Flash API)  │
└────────────┬────────────┘
│ Enforces Structured Output Enforcement
▼
┌─────────────────────────┐
│ Off-White & Maroon UI   │
│  (templates/index.html) │
└─────────────────────────┘


### Component Breakdown
1. **Data Ingestion Engine (`sample_inbox.json`)**: Serves as a batch input layer containing email senders, subjects, bodies, and application timestamps.
2. **Flask Backend Engine (`app.py`)**: Handles server routing, secures client interaction with the Google GenAI SDK, and reads `GEMINI_API_KEY` safely from system environment variables.
3. **Gemini Intelligence Layer (`gemini-3.8-flash`)**: Evaluates incoming application emails against security rules and output schemas (`response_mime_type="application/json"`).
4. **Interactive Dashboard (`templates/index.html`)**: A responsive Off-White and Maroon interface providing telemetry cards, category tabs, scam warnings, and generated interview prep guides.

---

## 3. UI/UX Design System

### Palette Specifications
- **Base Background**: Off-White (`#fcfbf9`) with subtle radial background patterning.
- **Primary Accent**: Deep Maroon (`#800020`) for call-to-actions, headers, and active filter tabs.
- **Card Surfaces**: Pure White (`#ffffff`) with subtle maroon border accents (`#e8e2dc`).
- **Semantic Indicators**:
  - 🟢 **Emerald**: Active Interview invites and generated preparation strategies.
  - 🔴 **Maroon / Red**: Flagged fraudulent emails and listed security violations.
  - 🟡 **Amber**: Overdue follow-up notifications (>7 days since applied).

---

## 4. API & Data Schema Specification

### 4.1 Input Payload Schema (`sample_inbox.json`)
```json
[
  {
    "id": 1,
    "sender": "string",
    "subject": "string",
    "body": "string",
    "date": "YYYY-MM-DD"
  }
]
4.2 Gemini Output Schema
JSON
[
  {
    "id": 1,
    "status": "Applied | Interview | Rejected | Offer | Suspicious/Scam",
    "is_scam": true,
    "scam_reasons": ["string"],
    "needs_followup": false,
    "interview_prep_notes": ["string"]
  }
]
5. Security Threat Model & Heuristics
The engine executes structured checks to detect job search scams:

Free-Domain Recruiter Spoofing: Corporate recruiters offering roles from @gmail.com or @yahoo.com.

Advance-Fee Fraud: Upfront requests for mandatory training, onboarding, or hardware registration fees.

Inactivity Tracking: Logic marking applications as overdue if status remains Applied past 7 days relative to current evaluation date (2026-10-24).

6. Local Setup & Execution
Set API Key:

PowerShell
$env:GEMINI_API_KEY="your_api_key_here"
Launch Server:

PowerShell
python app.py
Open Dashboard:
Navigate to http://127.0.0.1:5000 in any modern web browser.


---

### Step 2: Push to GitHub

Run these commands in your VS Code PowerShell terminal to commit `DESIGN.md`:

```powershell
git add DESIGN.md
git commit -m "Added complete DESIGN.md documentation"
git push origin main