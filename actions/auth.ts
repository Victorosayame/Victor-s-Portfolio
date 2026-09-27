"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { comparePassword } from "@/lib/auth/bcrypt";
import { signToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/auth/prisma";

const SESSION_COOKIE = process.env.SESSION_COOKIE;

if (!SESSION_COOKIE) {
  throw new Error("SESSION_COOKIE is not defined in the environment variables.");
}

export type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");

  if (
    typeof emailValue !== "string" ||
    typeof passwordValue !== "string" ||
    !emailValue.trim() ||
    !passwordValue
  ) {
    return {
      error: "Invalid email or password.",
    };
  }

  const email = emailValue.toLowerCase().trim();

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    return {
      error: "Invalid email or password.",
    };
  }

  const passwordMatches = await comparePassword(
    passwordValue,
    admin.passwordHash,
  );

  if (!passwordMatches) {
    return {
      error: "Invalid email or password.",
    };
  }

  const token = signToken(admin.id);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE!, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout() {
    const cookieStore = await cookies();

    cookieStore.delete(SESSION_COOKIE!)

    redirect("/admin/login");
}