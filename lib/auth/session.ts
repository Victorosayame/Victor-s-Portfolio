import "server-only";

import { cookies } from "next/headers";

import { verifyToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/auth/prisma";

const SESSION_COOKIE = process.env.SESSION_COOKIE;

if (!SESSION_COOKIE) {
  throw new Error(
    "SESSION_COOKIE is not defined in the environment variables.",
  );
}

export async function requireAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE!)?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const session = verifyToken(token);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const admin = await prisma.admin.findUnique({
    where: {
      id: session.adminId,
    },
  });

  if (!admin) {
    throw new Error("Unauthorized");
  }

  return admin;
}