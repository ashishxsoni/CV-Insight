import type { ParsedResume, ParsedJD, MatchedJob, MatchResult, SkillAnalysis } from "@/types";

/**
 * Match a parsed resume against an array of parsed JDs.
 * Returns the full MatchResult JSON as required by the assignment.
 */
export function matchResumeToJDs(
  resume: ParsedResume,
  jds: ParsedJD[]
): MatchResult {
  // Pre-build a lowercase Set for O(1) skill lookup instead of O(n) per check
  const resumeSkillSet = new Set(resume.resumeSkills.map((s) => s.toLowerCase()));

  const matchingJobs: MatchedJob[] = jds.map((jd) => {
    const skillsAnalysis: SkillAnalysis[] = jd.allSkills.map((skill) => ({
      skill,
      presentInResume: resumeSkillSet.has(skill.toLowerCase()),
    }));

    const matched = skillsAnalysis.filter((s) => s.presentInResume).length;
    const total = skillsAnalysis.length;
    const matchingScore =
      total > 0 ? Math.round((matched / total) * 100) : 0;

    return {
      jobId: jd.jobId,
      role: jd.role,
      company: jd.company,
      aboutRole: jd.aboutRole,
      requiredSkills: jd.requiredSkills,
      optionalSkills: jd.optionalSkills,
      skillsAnalysis,
      matchingScore,
      salary: jd.salary,
      yearsOfExperience: jd.yearsOfExperience,
    };
  });

  // Sort by matchingScore descending
  matchingJobs.sort((a, b) => b.matchingScore - a.matchingScore);

  return {
    name: resume.name,
    email: resume.email,
    phone: resume.phone,
    salary: resume.salary,
    yearOfExperience: resume.yearOfExperience,
    resumeSkills: resume.resumeSkills,
    matchingJobs,
  };
}
