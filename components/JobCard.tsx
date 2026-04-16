"use client";

import type { MatchedJob } from "@/types";
import { ScoreBadge, ScoreBar } from "./ScoreBadge";
import { useState } from "react";

interface JobCardProps {
  job: MatchedJob;
  rank: number;
}

export function JobCard({ job, rank }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  const matchedSkills = job.skillsAnalysis.filter((s) => s.presentInResume);
  const missingSkills = job.skillsAnalysis.filter((s) => !s.presentInResume);

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-sm font-bold flex items-center justify-center">
            {rank}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-zinc-900 dark:text-white truncate">{job.role}</h3>
            {job.company && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.company}</p>
            )}
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{job.jobId}</p>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          <ScoreBadge score={job.matchingScore} />
          {job.salary && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400 max-w-40 text-right truncate">
              💰 {job.salary}
            </span>
          )}
          {job.yearsOfExperience != null && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              🕒 {job.yearsOfExperience}+ yrs
            </span>
          )}
        </div>
      </div>

      {/* Score bar */}
      <div className="px-5 pb-3">
        <ScoreBar score={job.matchingScore} />
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
          {matchedSkills.length} / {job.skillsAnalysis.length} skills matched
        </p>
      </div>

      {/* About */}
      {job.aboutRole && (
        <div className="px-5 pb-3">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{job.aboutRole}</p>
        </div>
      )}

      {/* Toggle details */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline pb-3 focus:outline-none"
      >
        {expanded ? "▲ Hide skills analysis" : "▼ Show skills analysis"}
      </button>

      {expanded && (
        <div className="border-t border-zinc-100 dark:border-zinc-700 p-5 space-y-4">
          {matchedSkills.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-2">
                ✅ Matched Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((s) => (
                  <span
                    key={s.skill}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    {s.skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {missingSkills.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 dark:text-red-400 mb-2">
                ❌ Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((s) => (
                  <span
                    key={s.skill}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  >
                    {s.skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.requiredSkills.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2">
                📋 Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((s) => (
                  <span
                    key={s}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.skillsAnalysis.find((sa) => sa.skill === s)?.presentInResume
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.optionalSkills.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2">
                💡 Optional / Good-to-have Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.optionalSkills.map((s) => (
                  <span
                    key={s}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.skillsAnalysis.find((sa) => sa.skill === s)?.presentInResume
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
