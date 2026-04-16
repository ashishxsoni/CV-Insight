import { SKILL_LOOKUP, SKILLS_DB } from "@/lib/skillsDb";

/**
 * Extract all skills from a block of text using the skills dictionary.
 *
 * Strategy:
 * 1. Check for multi-word aliases first (longest match wins).
 * 2. Check single-word canonical names.
 * 3. Return deduplicated canonical names.
 */
export function extractSkills(text: string): string[] {
  const normalised = " " + text.toLowerCase().replace(/[^\w\s+#./\-]/g, " ") + " ";
  const found = new Set<string>();

  // Sort aliases by length descending so longer phrases match before sub-words
  const allAliases: Array<{ pattern: string; canonical: string }> = [];
  for (const entry of SKILLS_DB) {
    allAliases.push({ pattern: entry.canonical.toLowerCase(), canonical: entry.canonical });
    for (const alias of entry.aliases) {
      allAliases.push({ pattern: alias.toLowerCase(), canonical: entry.canonical });
    }
  }
  allAliases.sort((a, b) => b.pattern.length - a.pattern.length);

  for (const { pattern, canonical } of allAliases) {
    // Use word-boundary-like check: surrounded by non-word chars or spaces
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<![\\w])${escaped}(?![\\w])`, "i");
    if (re.test(normalised)) {
      found.add(canonical);
    }
  }

  return Array.from(found);
}

/**
 * Given a JD text determine which skills are "required" vs "optional".
 * Heuristic: skills mentioned under "required/must have" sections are required.
 * Skills after "good to have/desired/optional" are optional.
 */
export function categoriseJDSkills(text: string): {
  requiredSkills: string[];
  optionalSkills: string[];
} {
  // Split on common section headers that introduce optional/preferred skills
  const optionalMarker =
    /good[\s-]to[\s-]have|desired qualifications?|optional|nice[\s-]to[\s-]have|preferred (qualifications?|skills?|experience)|bonus|plus\b|desired (skills?|multipliers?)|what we[''`]?d like|desired experience|additional qualifications?/i;

  const optionalIdx = text.search(optionalMarker);

  let requiredText: string;
  let optionalText: string;

  if (optionalIdx > -1) {
    requiredText = text.slice(0, optionalIdx);
    optionalText = text.slice(optionalIdx);
  } else {
    requiredText = text;
    optionalText = "";
  }

  const requiredSkills = extractSkills(requiredText);
  const optionalSkills = optionalText
    ? extractSkills(optionalText).filter((s) => !requiredSkills.includes(s))
    : [];

  return { requiredSkills, optionalSkills };
}
