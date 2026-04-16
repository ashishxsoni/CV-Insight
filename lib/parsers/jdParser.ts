import type { ParsedJD } from "@/types";
import { extractSalary } from "@/lib/extractors/salaryExtractor";
import { extractExperience } from "@/lib/extractors/experienceExtractor";
import { categoriseJDSkills } from "@/lib/extractors/skillsExtractor";
import { buildAboutRole, extractRole } from "@/lib/extractors/textUtils";

/**
 * Parse a job description (plain text) into a structured ParsedJD object.
 * The id parameter is required — callers (e.g. the route handler) assign
 * sequential IDs per-request to avoid shared mutable state across requests.
 */
export function parseJD(rawText: string, id: string): ParsedJD {
  const jobId = id;

  const salary = extractSalary(rawText);
  const yearsOfExperience = extractExperience(rawText);
  const { requiredSkills, optionalSkills } = categoriseJDSkills(rawText);
  const allSkills = [...new Set([...requiredSkills, ...optionalSkills])];

  const role = extractRole(rawText);
  const aboutRole = buildAboutRole(rawText);

  // Detect company name heuristically from first few lines
  const company = detectCompany(rawText);

  // rawText kept internally but not returned to prevent leaking full JD in API
  return {
    jobId,
    role,
    company,
    aboutRole,
    requiredSkills,
    optionalSkills,
    allSkills,
    salary,
    yearsOfExperience,
    rawText,
  };
}

/**
 * Try to detect the hiring company from the JD text.
 */
function detectCompany(text: string): string | undefined {
  const patterns = [
    // "At Applied Materials, we care..." — word boundary before company name
    /\bAt\s+([A-Z][A-Za-z\s&'.,-]+?)\s*[,\n]/m,
    // "Joining Capgemini means..."
    /(?:Joining|Join)\s+([A-Z][A-Za-z\s&'.,-]+?)\s+(?:means|is)/mi,
    // "Apple is seeking" / "SpaceX was founded"
    /^([A-Z][A-Za-z\s&'.]+?)\s+(?:is|was|has)\s+(?:seeking|looking|a global|an independent|proud)/m,
    // "Choosing Capgemini means"
    /Choosing\s+([A-Z][A-Za-z\s&'.]+?)\s+means/mi,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m?.[1]) {
      const name = m[1].trim().replace(/[,.]$/, "");
      // Must be 3–50 chars and not be a generic phrase
      if (name.length >= 3 && name.length <= 50 && !/^(The|Our|We|This|A |An )/.test(name)) {
        return name;
      }
    }
  }
  return undefined;
}


