"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/auth/prisma";
import { requireAdmin } from "@/lib/auth/session";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation";

export type ContactActionState = {
  error?: string;
  success?: string;
};

export async function createContact(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  await requireAdmin();

  const rawData = Object.fromEntries(
    formData.entries(),
  );

  const normalizedData = {
    ...rawData,
    label:
      typeof rawData.label === "string"
        ? rawData.label.trim()
        : "",
    href:
      typeof rawData.href === "string"
        ? rawData.href.trim()
        : "",
    type:
      typeof rawData.type === "string"
        ? rawData.type
        : "",
  };

  const result = contactSchema.safeParse(
    normalizedData,
  );

  if (!result.success) {
    return {
      error:
        result.error.issues[0]?.message ??
        "Please check the contact fields.",
    };
  }

  const data: ContactFormValues = result.data;

  try {
    await prisma.contact.create({
      data: {
        label: data.label,
        href: data.href,
        type: data.type,
      },
    });
  } catch (error) {
    console.error(
      "Failed to create contact:",
      error,
    );

    return {
      error: "Unable to create contact.",
    };
  }

  revalidatePath("/admin/contacts");
  revalidatePath("/");

  return {
    success: "Contact created successfully.",
  };
}

export async function updateContact(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  await requireAdmin();

  const idValue = formData.get("id");

  if (
    typeof idValue !== "string" ||
    !idValue.trim()
  ) {
    return {
      error: "Contact ID is required.",
    };
  }

  const rawData = Object.fromEntries(
    formData.entries(),
  );

  const normalizedData = {
    ...rawData,
    label:
      typeof rawData.label === "string"
        ? rawData.label.trim()
        : "",
    href:
      typeof rawData.href === "string"
        ? rawData.href.trim()
        : "",
    type:
      typeof rawData.type === "string"
        ? rawData.type
        : "",
  };

  const result = contactSchema.safeParse(
    normalizedData,
  );

  if (!result.success) {
    return {
      error:
        result.error.issues[0]?.message ??
        "Please check the contact fields.",
    };
  }

  const data: ContactFormValues = result.data;

  try {
    await prisma.contact.update({
      where: {
        id: idValue,
      },
      data: {
        label: data.label,
        href: data.href,
        type: data.type,
      },
    });
  } catch (error) {
    console.error(
      "Failed to update contact:",
      error,
    );

    return {
      error: "Unable to update contact.",
    };
  }

  revalidatePath("/admin/contacts");
  revalidatePath("/");

  return {
    success: "Contact updated successfully.",
  };
}

export async function deleteContact(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  await requireAdmin();

  const idValue = formData.get("id");

  if (
    typeof idValue !== "string" ||
    !idValue.trim()
  ) {
    return {
      error: "Contact ID is required.",
    };
  }

  try {
    await prisma.contact.delete({
      where: {
        id: idValue,
      },
    });
  } catch (error) {
    console.error(
      "Failed to delete contact:",
      error,
    );

    return {
      error: "Unable to delete contact.",
    };
  }

  revalidatePath("/admin/contacts");
  revalidatePath("/");

  return {
    success: "Contact deleted successfully.",
  };
}