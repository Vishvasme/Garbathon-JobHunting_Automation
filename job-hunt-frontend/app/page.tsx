"use client";

import { useState, useEffect } from "react";

interface EmailItem {
  id: number;
  sender: string;
  subject: string;
  body: string;
  date: string;
}

interface AnalysisResult {
  id: number;
  company: string;
  role: string;
  status: string;
  is_scam: boolean;
  scam_reasons: string[];
  needs_followup: boolean;
  interview_prep_notes: string[];
}

const INITIAL_EMAILS: EmailItem[] = [
  {
    id: 1,
    sender: "hr@techcorp.com",
    subject: "Interview Invitation: Frontend Developer",
    body: "Hi Vishvas, we liked your profile for the Frontend Developer role. Let us schedule an interview for tomorrow at 3 PM.",
    date: "2026-10-22",
  },
  {
    id: 2,
    sender: "careers-support@gmail.com",
    subject: "Immediate Job Offer - Registration Required",
    body: "Congratulations! You are selected for the remote role. Please pay a mandatory training fee of Rs. 2,000 to process your offer letter.",
    date: "2026-10-24",
  },
  {
    id: 3,
    sender: "no-reply@workday.com",
    subject: "Application Received: Software Engineer",
    body: "Thank you for applying to our engineering team. We have received your application and will review it shortly.",
    date: "2026-10-10",
  },
];

export default function Home() {
  const [emails] = useState<EmailItem[]>(INITIAL_EMAILS);
  const [analysis, setAnalysis] = useState<AnalysisResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  const analyzeInbox = () => {
    setLoading(true);
    setTimeout(() => {
      const results: AnalysisResult[] = [
        {
          id: 1,
          company: "TechCorp",
          role: "Frontend Developer",
          status: "Interview",
          is_scam: false,
          scam_reasons: [],
          needs_followup: false,
          interview_prep_notes: [
            "Review core frontend concepts: JavaScript ES6+, React Hooks, State Management.",
            "Prepare concise examples of past performance optimizations and UI components built.",
          ],
        },
        {
          id: 2,
          company: "Unknown (Gmail Recruiter)",
          role: "Remote Associate",
          status: "Suspicious/Scam",
          is_scam: true,
          scam_reasons: [
            "Sender uses a free webmail domain (@gmail.com) for corporate job offer.",
            "Demands an upfront mandatory training fee of Rs. 2,000 before onboarding.",
          ],
          needs_followup: false,
          interview_prep_notes: [],
        },
        {
          id: 3,
          company: "Workday Client",
          role: "Software Engineer",
          status: "Applied",
          is_scam: false,
          scam_reasons: [],
          needs_followup: true,
          interview_prep_notes: [],
        },
      ];
      setAnalysis(results);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    analyzeInbox();
  }, []);

  const filteredItems = analysis
    ? analysis.filter((item) => {
        if (activeTab === "scams") return item.is_scam;
        if (activeTab === "followups") return item.needs_followup;
        if (activeTab === "interviews") return item.status === "Interview";
        return true;
      })
    : [];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Next.js Frontend
              </span>
              <span className="text-slate-400 text-sm">Garbathon 2026</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">
              Job Hunt Autopilot
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Automated Job Application Tracker & AI Scam Shield
            </p>
          </div>
          <button
            onClick={analyzeInbox}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Processing Gemini API..." : "Re-Run Gemini Automation"}
          </button>
        </header>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <p className="text-slate-400 text-sm font-medium">Inbox Processed</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              {emails.length} Emails
            </h3>
          </div>
          <div className="bg-slate-800/60 border border-emerald-500/30 rounded-xl p-5">
            <p className="text-emerald-400 text-sm font-medium">Interviews</p>
            <h3 className="text-2xl font-bold text-emerald-300 mt-1">
              {analysis ? analysis.filter((a) => a.status === "Interview").length : 0}
            </h3>
          </div>
          <div className="bg-slate-800/60 border border-red-500/30 rounded-xl p-5">
            <p className="text-red-400 text-sm font-medium">Flagged Scams</p>
            <h3 className="text-2xl font-bold text-red-400 mt-1">
              {analysis ? analysis.filter((a) => a.is_scam).length : 0}
            </h3>
          </div>
          <div className="bg-slate-800/60 border border-amber-500/30 rounded-xl p-5">
            <p className="text-amber-400 text-sm font-medium">Overdue Follow-ups</p>
            <h3 className="text-2xl font-bold text-amber-300 mt-1">
              {analysis ? analysis.filter((a) => a.needs_followup).length : 0}
            </h3>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          {["all", "interviews", "scams", "followups"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-400 bg-slate-800/40"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab === "all" ? "All Applications" : tab}
            </button>
          ))}
        </div>

        {/* Results Stream */}
        {loading ? (
          <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-800">
            <p className="text-slate-400 text-sm">Processing with Gemini 3.8 Flash...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const rawEmail = emails.find((e) => e.id === item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-slate-800/80 border rounded-xl p-6 transition-all ${
                    item.is_scam
                      ? "border-red-500/50 bg-red-950/10"
                      : item.status === "Interview"
                      ? "border-emerald-500/50 bg-emerald-950/10"
                      : "border-slate-700/60"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-white">
                        {item.company}
                      </h2>
                      <span className="text-slate-400 text-sm">
                        • {item.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.is_scam && (
                        <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">
                          ⚠️ SCAM DETECTED
                        </span>
                      )}
                      {item.needs_followup && (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">
                          🕒 Follow-up Overdue (&gt;7 days)
                        </span>
                      )}
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          item.status === "Interview"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : item.status === "Suspicious/Scam"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-xs mb-1">
                      Raw Email Body:
                    </span>
                    "{rawEmail?.body}"
                  </p>

                  {/* Security Red Flags Section */}
                  {item.is_scam && (
                    <div className="mt-3 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                      <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        Security Red Flags:
                      </p>
                      <ul className="list-disc list-inside text-red-300 text-xs space-y-1">
                        {item.scam_reasons.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interview Prep Section */}
                  {item.interview_prep_notes.length > 0 && (
                    <div className="mt-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-3">
                      <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        AI Interview Prep Notes:
                      </p>
                      <ul className="list-disc list-inside text-emerald-200 text-xs space-y-1">
                        {item.interview_prep_notes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}