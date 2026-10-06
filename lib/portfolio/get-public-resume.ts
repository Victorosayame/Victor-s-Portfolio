import { prisma } from "@/lib/auth/prisma";

export async function getPublicResume() {
  const resumeId = process.env.RESUME_ID;

  if (!resumeId) {
    return null;
  }

  return prisma.resume.findUnique({
    where: {
      id: resumeId,
    },
    select: {
      fileName: true,
      fileUrl: true,
      uploadedAt: true,
    },
  });
}
