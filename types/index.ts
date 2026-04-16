
export interface SkillAnalysis {
  skill: string;
  presentInResume: boolean;
}

export interface ParsedJD {
  jobId: string;
  role: string;
  company?: string;
  aboutRole: string;
  requiredSkills: string[];
  optionalSkills: string[];
  allSkills: string[];
  salary: string | null;
  yearsOfExperience: number | string | null;
  rawText: string;
}

export interface ParsedResume {
  name: string;
  email: string | null;
  phone: string | null;
  salary: string | null;
  yearOfExperience: number | null;
  resumeSkills: string[];
  rawText: string;
}

export interface MatchedJob {
  jobId: string;
  role: string;
  company?: string;
  aboutRole: string;
  requiredSkills: string[];
  optionalSkills: string[];
  skillsAnalysis: SkillAnalysis[];
  matchingScore: number;
  salary: string | null;
  yearsOfExperience: number | string | null;
}

export interface MatchResult {
  name: string;
  email: string | null;
  phone: string | null;
  salary: string | null;
  yearOfExperience: number | null;
  resumeSkills: string[];
  matchingJobs: MatchedJob[];
}

export interface SkillEntry {
  canonical: string;       // display name, e.g. "Spring Boot"
  aliases: string[];       // alternate spellings / abbreviations
  category: string;        // programming / framework / database / cloud / ...
}
