/**
 * PDF text extraction using pdf-parse v2.
 * pdf-parse v2 uses a class-based API: new PDFParse({ data }) then .getText()
 * Runs server-side only (Node.js).
 */

// Polyfill DOMMatrix for serverless environments (Vercel / Node.js) where the
// browser DOM API is unavailable but pdfjs-dist references it at module load.
if (typeof globalThis.DOMMatrix === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).DOMMatrix = class DOMMatrix {
    a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
    m11 = 1; m12 = 0; m13 = 0; m14 = 0;
    m21 = 0; m22 = 1; m23 = 0; m24 = 0;
    m31 = 0; m32 = 0; m33 = 1; m34 = 0;
    m41 = 0; m42 = 0; m43 = 0; m44 = 1;
    is2D = true; isIdentity = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_init?: string | number[]) {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    multiply(..._a: any[]) { return new (globalThis as any).DOMMatrix(); }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate(..._a: any[]) { return new (globalThis as any).DOMMatrix(); }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scale(..._a: any[]) { return new (globalThis as any).DOMMatrix(); }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rotate(..._a: any[]) { return new (globalThis as any).DOMMatrix(); }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inverse(..._a: any[]) { return new (globalThis as any).DOMMatrix(); }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flipX(..._a: any[]) { return new (globalThis as any).DOMMatrix(); }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flipY(..._a: any[]) { return new (globalThis as any).DOMMatrix(); }
    toFloat32Array() { return new Float32Array(16); }
    toFloat64Array() { return new Float64Array(16); }
    toJSON() { return {}; }
  };
}

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
