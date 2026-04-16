"use client";

import type { MatchResult } from "@/types";

interface ResumeProfileProps {
  result: MatchResult;
}

export function ResumeProfile({ result }: ResumeProfileProps) {
  const totalJobs = result.matchingJobs.length;
  const avg =
    totalJobs > 0
      ? Math.round(
          result.matchingJobs.reduce((s, j) => s + j.matchingScore, 0) / totalJobs
        )
      : 0;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-2xl font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
          {result.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{result.name}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {result.email && <span>✉️ {result.email}</span>}
            {result.phone && <span>📞 {result.phone}</span>}
            {result.salary && <span>💰 {result.salary}</span>}
            {result.yearOfExperience != null && (
              <span>🕒 {result.yearOfExperience} years exp.</span>
            )}
          </div>
        </div>
        <div className="ml-auto text-right shrink-0">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Avg. Match</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{avg}%</p>
        </div>
      </div>

      {result.resumeSkills.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2">
            🧠 Detected Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.resumeSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
