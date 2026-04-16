import type { ParsedResume } from "@/types";
import { extractSalary } from "@/lib/extractors/salaryExtractor";
import { extractExperience } from "@/lib/extractors/experienceExtractor";
import { extractSkills } from "@/lib/extractors/skillsExtractor";
import { extractName, extractEmail, extractPhone } from "@/lib/extractors/textUtils";

/**
 * Parse a resume (plain text) into a structured ParsedResume object.
 */
export function parseResume(rawText: string): ParsedResume {
  const name = extractName(rawText);
  const email = extractEmail(rawText);
  const phone = extractPhone(rawText);
  const salary = extractSalary(rawText);
  const yearOfExperience = extractExperience(rawText);
  const resumeSkills = extractSkills(rawText);

  return {
    name,
    email,
    phone,
    salary,
    yearOfExperience,
    resumeSkills,
    rawText,
  };
}
