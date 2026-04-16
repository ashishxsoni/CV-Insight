"use client";

import { useState } from "react";
import type { MatchResult } from "@/types";
import { FileDropzone } from "./FileDropzone";
import { ResumeProfile } from "./ResumeProfile";
import { JobCard } from "./JobCard";

type InputMode = "file" | "text";

export default function MatcherPage() {
  // Resume
  const [resumeMode, setResumeMode] = useState<InputMode>("file");
  const [resumeFile, setResumeFile] = useState<File[]>([]);
  const [resumeText, setResumeText] = useState("");

  // JDs
  const [jdMode, setJdMode] = useState<InputMode>("text");
  const [jdFiles, setJdFiles] = useState<File[]>([]);
  const [jdText, setJdText] = useState("");

  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [jsonVisible, setJsonVisible] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const fd = new FormData();

      if (resumeMode === "file" && resumeFile.length > 0) {
        fd.append("resume", resumeFile[0]);
      } else if (resumeMode === "text" && resumeText.trim()) {
        fd.append("resumeText", resumeText.trim());
      } else {
        setError("Please provide a resume (file or text).");
        setLoading(false);
        return;
      }

      if (jdMode === "file" && jdFiles.length > 0) {
        jdFiles.forEach((f) => fd.append("jd[]", f));
      } else if (jdMode === "text" && jdText.trim()) {
        fd.append("jdText", jdText.trim());
      } else {
        setError("Please provide at least one job description (file or text).");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/match", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setResult(data as MatchResult);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    setResumeFile([]);
    setResumeText("");
    setJdFiles([]);
    setJdText("");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              🎯 CV Insight
            </h1>
            <p className="text-xs text-zinc-400">Rule-based · No LLMs used</p>
          </div>
          {result && (
            <button
              onClick={reset}
              className="text-sm text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 underline"
            >
              ← New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {!result ? (
          /* ── Input Form ─────────────────────────────────────────────── */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Resume input */}
            <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">📄 Resume</h2>
                <div className="flex gap-2 text-sm">
                  {(["file", "text"] as InputMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setResumeMode(m)}
                      className={`px-3 py-1 rounded-full transition-all ${
                        resumeMode === m
                          ? "bg-indigo-600 text-white"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {m === "file" ? "Upload file" : "Paste text"}
                    </button>
                  ))}
                </div>
              </div>

              {resumeMode === "file" ? (
                <FileDropzone
                  label="Drop your resume PDF or TXT"
                  onFilesSelected={setResumeFile}
                  selectedFiles={resumeFile}
                />
              ) : (
                <textarea
                  className="w-full h-52 p-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Paste your resume text here…"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              )}
            </section>

            {/* JD input */}
            <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">💼 Job Description(s)</h2>
                <div className="flex gap-2 text-sm">
                  {(["file", "text"] as InputMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setJdMode(m)}
                      className={`px-3 py-1 rounded-full transition-all ${
                        jdMode === m
                          ? "bg-indigo-600 text-white"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {m === "file" ? "Upload files" : "Paste text"}
                    </button>
                  ))}
                </div>
              </div>

              {jdMode === "file" ? (
                <FileDropzone
                  label="Drop one or more JD PDFs or TXTs"
                  multiple
                  onFilesSelected={setJdFiles}
                  selectedFiles={jdFiles}
                />
              ) : (
                <textarea
                  className="w-full h-72 p-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Paste the job description text here…"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />
              )}
            </section>

            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold text-base transition-all"
            >
              {loading ? "⏳ Analysing…" : "🔍 Match Resume to Jobs"}
            </button>
          </form>
        ) : (
          /* ── Results ─────────────────────────────────────────────────── */
          <div className="space-y-6">
            <ResumeProfile result={result} />

            <div>
              <h2 className="font-semibold text-lg mb-4">
                📊 Matched Jobs ({result.matchingJobs.length})
              </h2>
              <div className="space-y-4">
                {result.matchingJobs.map((job, i) => (
                  <JobCard key={job.jobId} job={job} rank={i + 1} />
                ))}
              </div>
            </div>

            {/* JSON output */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setJsonVisible((v) => !v)}
                className="w-full flex items-center justify-between p-4 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
              >
                <span>📋 Raw JSON Output</span>
                <span>{jsonVisible ? "▲" : "▼"}</span>
              </button>
              {jsonVisible && (
                <div className="border-t border-zinc-100 dark:border-zinc-700 p-4">
                  <pre className="text-xs font-mono text-zinc-700 dark:text-zinc-300 overflow-auto max-h-[60vh] whitespace-pre-wrap wrap-break-word">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                    }}
                    className="mt-3 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    📋 Copy to clipboard
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-zinc-400 py-8">
        Resume Parsing &amp; Job Matching System · Rule-based · No LLMs
      </footer>
    </div>
  );
}
