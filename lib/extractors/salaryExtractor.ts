/**
 * Rule-based salary extractor.
 * Handles LPA, CTC (₹), USD dollar ranges, and hourly rates.
 */
export function extractSalary(text: string): string | null {
  // Patterns: each captures the salary VALUE in capture group 1 (without label)
  const labelledPatterns: RegExp[] = [
    // "Salary: 12 LPA" / "CTC: ₹10,00,000 per annum"
    /(?:salary|ctc|compensation)[:\s]*₹?\s*([\d,]+(?:\.\d+)?(?:\s*-\s*[\d,]+(?:\.\d+)?)?\s*(?:lpa|lac|lakh|l\.p\.a\.?|per\s+annum|\/\s*annum|\/\s*yr))/gi,
    // "Salary: $180,000 - $220,000"
    /(?:salary|compensation|pay range|pay)[:\s]*(\$\s*[\d,]+(?:\.\d+)?\s*(?:--|-|to)\s*\$\s*[\d,]+(?:\.\d+)?(?:\s*(?:per\s+year|\/\s*year|annually))?)/gi,
    // "Global Comp\n$180,000 - $220,000"
    /(?:global comp|base compensation range)[^\n]*\n\s*(\$?\s*[\d,]+(?:\.\d+)?\s*[-–]\s*\$?\s*[\d,]+(?:\.\d+)?)/gi,
  ];

  for (const pattern of labelledPatterns) {
    pattern.lastIndex = 0;
    const match = pattern.exec(text);
    if (match?.[1]) return match[1].trim().replace(/\s+/g, " ");
  }

  // Unlabelled patterns (return full match)
  const unlabelledPatterns: RegExp[] = [
    // Indian: "12 LPA"
    /[\d,]+(?:\.\d+)?\s*(?:lpa|lac|lakh|l\.p\.a\.?)/gi,
    // USD range: "$139,000 -- $257,550 annually"
    /\$\s*[\d,]+(?:\.\d+)?\s*(?:--|-|to)\s*\$\s*[\d,]+(?:\.\d+)?(?:\s*(?:per\s+year|\/\s*year|annually|per\s+annum|\/\s*yr))?/gi,
    // USD single + optional range: "$180,000 - $220,000" or "$180,000"
    /\$\s*[\d,]+(?:\s*[-–]\s*\$\s*[\d,]+)?(?:\s*(?:per\s+year|\/\s*year|annually|\/\s*yr|per\s+annum))?/gi,
    // Bare number range: "61087 - 104364"
    /\b\d{5,6}\s*[-–]\s*\d{5,6}\b/g,
    // Hourly: "$58.65/hour"
    /\$\s*[\d,]+(?:\.\d+)?\s*\/\s*hour/gi,
  ];

  for (const pattern of unlabelledPatterns) {
    pattern.lastIndex = 0;
    const match = pattern.exec(text);
    if (match?.[0]) return match[0].trim().replace(/\s+/g, " ");
  }

  return null;
}
