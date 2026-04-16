/**
 * PDF text extraction using pdf-parse v1.
 * v1 bundles its own pdfjs build with no worker dependency — safe in
 * serverless environments (Vercel, AWS Lambda, etc.).
 * Runs server-side only (Node.js).
 */

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Import from lib/pdf-parse.js directly to bypass the test/index.js file
  // that runs fs.readFileSync at startup (causes errors in Next.js bundler).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // @ts-ignore – sub-path has no types; @types/pdf-parse covers the root only
  const mod: any = await import("pdf-parse/lib/pdf-parse.js");
  const pdfParse = mod.default ?? mod;

  const data = await pdfParse(buffer);
  return data.text ?? "";
}
