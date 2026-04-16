/**
 * PDF text extraction using pdf-parse v2.
 * pdf-parse v2 uses a class-based API: new PDFParse({ data }) then .getText()
 * Runs server-side only (Node.js).
 */

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod: any = await import("pdf-parse");
  const PDFParse = mod.PDFParse ?? mod.default?.PDFParse;

  if (!PDFParse) {
    throw new Error(
      "pdf-parse: could not find PDFParse class. Ensure pdf-parse v2 is installed."
    );
  }

  // pdf-parse v2: constructor takes { data: Buffer|Uint8Array }
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  return result.text ?? "";
}
