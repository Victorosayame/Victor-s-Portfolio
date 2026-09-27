"use server";

import { prisma } from "@/lib/auth/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { TechStackFormValues, techStackSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export type TechStackActionState = {
    error?: string;
    success?: string;
}

export async function createTechStack(
    _prevState: TechStackActionState,
    formData: FormData,): Promise<TechStackActionState> {
    // await requireAdmin(); // Ensure the user is authenticated and authorized to perform this action.
    await requireAdmin()

    const rawData = Object.fromEntries(formData.entries());

    const result = techStackSchema.safeParse(rawData);

    if (!result.success) {
        return {
            error: result.error.issues[0]?.message ?? "Please check the tech stack fields"
        }
    }

    const data: TechStackFormValues = result.data;

    await prisma.techStack.create({
        data: {
            name: data.name,
            category: data.category,
            order: data.order,
        },
    });

    revalidatePath("/admin/techstack");

    return {
        success: "Technology added successfully."
    };
    }