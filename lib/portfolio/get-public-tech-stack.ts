import { prisma } from "@/lib/auth/prisma";

export async function getPublicTechStack() {
  return prisma.techStack.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      order: true,
    },
    orderBy: [
      {
        order: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
}
