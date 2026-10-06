"use server";

import { prisma } from "@/lib/auth/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { resumeSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

const RESUME_ID = process.env.RESUME_ID;

export type ResumeActionState = {
    error?: string;
    success?: string;
}

export async function saveResume(
    _prevState: ResumeActionState,
    formData: FormData,
): Promise<ResumeActionState> {
    await requireAdmin();

    if(!RESUME_ID) {
        return {
            error: "Resume ID is not configured."
        }
    }

    const rawData = Object.fromEntries(formData.entries());

    const normalizedData = {
  fileName:
    typeof rawData.fileName === "string"
      ? rawData.fileName.trim()
      : "",

  fileUrl:
    typeof rawData.fileUrl === "string"
      ? rawData.fileUrl.trim()
      : "",
};

    const parsed = resumeSchema.safeParse(normalizedData);

    if(!parsed.success) {
        return {
            error: parsed.error.issues[0]?.message ?? "Invalid resume data",
        }
    }

      try {
        await prisma.resume.upsert({
            where: {
                id: RESUME_ID,
            },
            update: {
                fileName: parsed.data.fileName,
                fileUrl: parsed.data.fileUrl,
                uploadedAt: new Date()
            },
            create: {
                id: RESUME_ID,
                fileName: parsed.data.fileName,
                fileUrl:  parsed.data.fileUrl,
            }
        });
      } catch (error) {
        console.error("Failed to save resume:", error);

        return {
            error: "Unable to save resume."
        }
      }

      revalidatePath("/admin/resume")
    return {
        success: "Resume uploaded successfully"
    }
}