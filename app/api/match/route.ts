import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/parsers/pdfParser";
import { parseResume } from "@/lib/parsers/resumeParser";
import { parseJD } from "@/lib/parsers/jdParser";
import { matchResumeToJDs } from "@/lib/matcher";

export const runtime = "nodejs";

/**
 * POST /api/match
 *
 * Accepts multipart/form-data:
 *   - resume: File (PDF, TXT)  — the candidate's resume
 *   - jd[]:  File[] (PDF, TXT) — one or more job descriptions  (OR)
 *   - jdText: string            — raw JD text (for single JD text input)
 *   - resumeText: string        — raw resume text (for paste mode)
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();

    // ── Resume ────────────────────────────────────────────────────────────
    let resumeText = "";
    const resumeFile = formData.get("resume") as File | null;
    const resumeTextRaw = formData.get("resumeText") as string | null;

    if (resumeFile && resumeFile.size > 0) {
      const buf = Buffer.from(await resumeFile.arrayBuffer());
      if (resumeFile.type === "application/pdf" || resumeFile.name.endsWith(".pdf")) {
        resumeText = await extractTextFromPDF(buf);
      } else {
        resumeText = buf.toString("utf-8");
      }
    } else if (resumeTextRaw) {
      resumeText = resumeTextRaw;
    } else {
      return NextResponse.json({ error: "No resume provided." }, { status: 400 });
    }

    // ── Job Descriptions ──────────────────────────────────────────────────
    const jdTexts: string[] = [];

    // Multiple JD files
    const jdFiles = formData.getAll("jd[]") as File[];
    for (const file of jdFiles) {
      if (file && file.size > 0) {
        const buf = Buffer.from(await file.arrayBuffer());
        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
          jdTexts.push(await extractTextFromPDF(buf));
        } else {
          jdTexts.push(buf.toString("utf-8"));
        }
      }
    }

    // Fallback: one or more JD text fields (supports multiple -F "jdText=...")
    const jdTextFields = formData.getAll("jdText") as string[];
    for (const raw of jdTextFields) {
      if (raw && raw.trim()) jdTexts.push(raw.trim());
    }

    if (jdTexts.length === 0) {
      return NextResponse.json({ error: "No job descriptions provided." }, { status: 400 });
    }

    // ── Parse & Match ─────────────────────────────────────────────────────
    const parsedResume = parseResume(resumeText);
    const parsedJDs = jdTexts.map((text, i) =>
      parseJD(text, `JD${String(i + 1).padStart(3, "0")}`)
    );

    const result = matchResumeToJDs(parsedResume, parsedJDs);
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[/api/match]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
