/**
 * Utility: extract candidate name from resume text.
 *
 * Heuristic: the name is typically the first non-empty, non-URL, non-email
 * line at the top of the resume before any section header.
 */
export function extractName(text: string): string {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const sectionHeaders =
    /^(summary|objective|profile|education|experience|skills|contact|work|projects|certifications|awards|references|about)/i;

  for (const line of lines.slice(0, 10)) {
    if (line.length < 3 || line.length > 80) continue;
    if (/\d{5,}/.test(line)) continue; // phone / zip numbers
    if (/@/.test(line)) continue; // email
    if (/https?:\/\//.test(line)) continue;
    if (sectionHeaders.test(line)) break;
    // A name usually has 2-4 words, each capitalised
    const words = line.split(/\s+/);
    if (words.length >= 2 && words.length <= 5 && words.every((w) => /^[A-Z]/.test(w))) {
      return line;
    }
  }

  // Fallback: return the first short line
  for (const line of lines.slice(0, 5)) {
    if (line.length >= 3 && line.length <= 60 && !/[@\d]/.test(line)) return line;
  }

  return "Unknown";
}

/**
 * Extract email address from text.
 */
export function extractEmail(text: string): string | null {
  const m = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return m ? m[0] : null;
}

/**
 * Extract phone number from text.
 */
export function extractPhone(text: string): string | null {
  const m = text.match(
    /(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/
  );
  return m ? m[0].trim() : null;
}

/**
 * Build a short "about role" summary from JD text.
 * Skips company intro boilerplate and looks for the actual role description.
 */
export function buildAboutRole(text: string): string {
  // Try to find the actual role description section
  const roleDescMarker =
    /(?:the opportunity|position overview|about the role|job description|role description|responsibilities|what you[''`]?ll do|overview)\s*[:—\n]/i;
  const markerIdx = text.search(roleDescMarker);

  const sourceText = markerIdx > -1 ? text.slice(markerIdx) : text;

  const boilerplate =
    /changing the world|global leader|founded|headquartered|our mission|equal opportunity|about us|who we are/i;

  const lines = sourceText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 30 && !boilerplate.test(l));

  const joined = lines.slice(0, 3).join(" ");
  return joined.length > 300 ? joined.slice(0, 297) + "..." : joined;
}

/**
 * Detect the job role / title from a JD.
 * Tries explicit label patterns first, then common phrasings, then
 * falls back to scanning early lines.
 */
export function extractRole(text: string): string {
  const rolePatterns: RegExp[] = [
    // Explicit label: "Position: Software Engineer" / "Job Title: …"
    /^(?:position|job title|title|role)[:\s]+([^\n,]{3,80})/im,
    // "is seeking a Software Engineer"
    /(?:seeking|hiring|looking for)\s+(?:a\s+|an\s+)?([A-Z][a-zA-Z\s\/]{3,60})(?=[,\n])/,
    // "As a Software Engineer at …" or "As a Software Engineer,"
    /\bAs\s+(?:a|an)\s+([A-Z][a-zA-Z\s\/]{3,60})(?:\s+at\b|[,\n])/,
    // ALL-CAPS title line: "FULL STACK SOFTWARE ENGINEER (BUILD RELIABILITY)"
    /^([A-Z][A-Z\s\/()]{5,80})$/m,
    // "for a Software Engineer" / "for a Full Stack Developer"
    /\bfor\s+(?:a|an)\s+([A-Z][a-zA-Z\s\/]{3,60})(?=[,\n])/,
  ];
  for (const p of rolePatterns) {
    const m = text.match(p);
    if (m?.[1]) {
      const candidate = m[1].trim();
      // Reject: sentence-like company descriptions, or bare section headers ending in ":"
      if (
        !/\b(is|are|was|has|have|will|can|their|our|we|you'll)\b/i.test(candidate) &&
        !/[:\u2014]$/.test(candidate)
      ) {
        return candidate;
      }
    }
  }
  // Fallback: first short line that isn't boilerplate
  const skipLine =
    /salary|ctc|compensation|\$|lpa|lac|lakh|experience|requirement|qualification|bachelor|master|phd|clearance|citizenship|benefit|equal opportunity|remote|onsite|full.?time|global leader|changing the world|mission/i;
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length >= 5 && l.length <= 100 && !skipLine.test(l));
  if (lines[0]) return lines[0];
  return "Software Engineer";
}
