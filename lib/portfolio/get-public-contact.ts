import { prisma } from "@/lib/auth/prisma";

export async function getPublicContacts() {
  return prisma.contact.findMany({
    select: {
      id: true,
      label: true,
      href: true,
      type: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
