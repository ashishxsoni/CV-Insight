/**
 * Rule-based years-of-experience extractor.
 *
 * For RESUMES  — section-aware: only counts dates inside the Experience/Work
 *               History section, ignoring Education & Project dates.
 * For JDs      — reads explicit statements like "5+ years of experience".
 */

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
  "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "oct", "nov", "dec",
];

const MONTH_INDEX: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  january: 0, february: 1, march: 2, april: 3, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/** Section headers that mark the END of an Experience section */
const AFTER_EXPERIENCE_HEADERS =
  /^(projects?|education|skills?|certifications?|achievements?|awards?|publications?|languages?|interests?|references?|summary|objective|profile|extra|activities|position|coding)/im;

/** Section headers that mark the START of an Experience section */
const EXPERIENCE_HEADER = /^(experience|work\s+experience|employment|work\s+history|professional\s+experience|internship)/im;

/**
 * Isolate the "Experience / Work History" section text from a resume.
 * Returns the full text unchanged if no clear section is found (handles JDs).
 */
function extractExperienceSection(text: string): string {
  const lines = text.split("\n");

  let insideExp = false;
  let startIdx = -1;
  let endIdx = lines.length;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!insideExp && EXPERIENCE_HEADER.test(trimmed)) {
      insideExp = true;
      startIdx = i + 1; // start collecting from the NEXT line
      continue;
    }
    if (insideExp && trimmed.length > 0 && AFTER_EXPERIENCE_HEADERS.test(trimmed)) {
      endIdx = i;
      break;
    }
  }

  if (startIdx === -1) return text; // no Experience header found — return full text (for JDs)
  return lines.slice(startIdx, endIdx).join("\n");
}

/**
 * Return years of experience found in text.
 * - For resumes: scoped to the Experience section only.
 * - For JDs: reads explicit "N+ years" statements.
 */
export function extractExperience(text: string): number | null {
  const lower = text.toLowerCase();

  // Fresher / entry-level (check full text first)
  if (/\b(fresher|entry[\s-]level|0\s*years?|no experience)\b/.test(lower)) {
    return 0;
  }

  // Explicit "N years of experience" patterns (works for both resumes & JDs)
  const explicitPatterns = [
    /(\d+(?:\.\d+)?)\s*\+?\s*years?\s+(?:of\s+)?(?:relevant\s+|related\s+|handson\s+|hands[- ]on\s+)?experience/i,
    /(\d+(?:\.\d+)?)\s*[-–]\s*\d+\s*\+?\s*years?\s+(?:of\s+)?(?:relevant\s+|related\s+)?experience/i,
    /experience[:\s]+(\d+(?:\.\d+)?)\s*\+?\s*years?/i,
    /(\d+(?:\.\d+)?)\s*\+\s*years?\s+(?:of\s+)?(?:strong\s+)?(?:hands[- ]?on\s+)?experience/i,
    /(\d+(?:\.\d+)?)\s*years?\s+(?:of\s+)?(?:strong\s+)?(?:handson\s+)?experience/i,
  ];

  for (const pat of explicitPatterns) {
    const m = text.match(pat);
    if (m) return parseFloat(m[1]);
  }

  // Section-aware date-range calculation (resumes only)
  const expSectionText = extractExperienceSection(text);
  const totalMonths = computeMonthsFromDateRanges(expSectionText);
  if (totalMonths > 0) {
    return Math.round((totalMonths / 12) * 10) / 10;
  }

  return null;
}

/**
 * Scan text for date ranges like "Aug 2025 – Present" or "2018 - 2022"
 * and sum up total months. Only professional job tenure dates, NOT education.
 */
function computeMonthsFromDateRanges(text: string): number {
  const now = new Date();
  let total = 0;

  // "Month YYYY – Month YYYY"  or  "Month YYYY – present"
  const monthYearRange = new RegExp(
    `(${MONTHS.join("|")})\\s+(\\d{4})\\s*[-–—]+\\s*(?:(${MONTHS.join("|")})\\s+(\\d{4})|(present|current|now|till\\s+date|till\\s+now))`,
    "gi"
  );

  for (const m of text.matchAll(monthYearRange)) {
    const m1 = m[1].toLowerCase();
    const y1 = parseInt(m[2], 10);
    // Skip obviously future start dates (education "expected" dates)
    if (y1 > now.getFullYear()) continue;

    const isPresent = !!m[5];
    const startDate = new Date(y1, MONTH_INDEX[m1] ?? 0, 1);
    let endDate: Date;
    if (isPresent) {
      endDate = now;
    } else {
      const m2 = m[3].toLowerCase();
      const y2 = parseInt(m[4], 10);
      // Skip future end dates (e.g. "Expected July 2026")
      if (y2 > now.getFullYear()) continue;
      endDate = new Date(y2, MONTH_INDEX[m2] ?? 11, 1);
    }
    const diff =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    if (diff > 0) total += diff;
  }

  // Fallback: bare "YYYY – YYYY" or "YYYY – present" (only if no month-ranges found)
  if (total === 0) {
    const yearRange = /\b(20\d{2}|19\d{2})\s*[-–—]+\s*(20\d{2}|19\d{2}|present|current|now)\b/gi;
    for (const m of text.matchAll(yearRange)) {
      const y1 = parseInt(m[1], 10);
      if (y1 > now.getFullYear()) continue;
      const isPresent = /present|current|now/i.test(m[2]);
      const y2 = isPresent ? now.getFullYear() : parseInt(m[2], 10);
      if (y2 > now.getFullYear()) continue;
      const diff = (y2 - y1) * 12;
      if (diff > 0) total += diff;
    }
  }

  return total;
}
