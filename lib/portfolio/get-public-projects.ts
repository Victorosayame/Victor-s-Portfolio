import { prisma } from "@/lib/auth/prisma";

export async function getPublicProjects() {
  return prisma.project.findMany({
    where: {
      featured: true,
    },
    select: {
      id: true,
      title: true,
      role: true,
      summary: true,
      outcome: true,
      imageUrl: true,
      liveUrl: true,
      repoUrl: true,
      caseStudyUrl: true,
      order: true,
    },
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}
