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

    export async function updateTechStack(
        _prevState: TechStackActionState,
        formData: FormData,
    ): Promise<TechStackActionState> {
        await requireAdmin(); // Ensure the user is authenticated and authorized to perform this action.
        const idValue = formData.get("id");

        if (typeof idValue !== "string" || !idValue.trim()) {
            return {
                error: "Invalid tech stack ID."
            }
        }

         const rawData = Object.fromEntries(formData.entries());

  const result = techStackSchema.safeParse({
    name: rawData.name,
    category: rawData.category,
    order: rawData.order,
  });

      if(!result.success) {
        return {
            error: result.error.issues[0]?.message ?? "Please check the tech stack fields"
        }
      }

      const data = result.data;

      try {
        await prisma.techStack.update({
            where: { id: idValue },
            data: {
                name: data.name,
                category: data.category,
                order: data.order,
            },
        });
      } catch (error) {
        return {
            error: "Failed to update technology."
        }
      }

    revalidatePath("/admin/techstack");

        return {
            success: "Technology updated successfully."
        }
    }


    export async function deleteTechStack(
        _prevState: TechStackActionState,
        formData: FormData,
    ): Promise<TechStackActionState> {
        await requireAdmin(); // Ensure the user is authenticated and authorized to perform this action.
        const idValue = formData.get("id");

        try {
            if (typeof idValue !== "string" || !idValue.trim()) {
                return {
                    error: "Invalid tech stack ID."
                }
            }
            await prisma.techStack.delete({
                where: { id: idValue },
            })
        } catch {
            return {
                error: "Failed to delete technology."
            }
        }

        revalidatePath("/admin/techstack");

        return {
            success: "Technology deleted successfully."
        }
    }


    // Function to move a tech stack item up or down in the order, this is to be used in the admin panel to reorder the tech stack items. Especially after deleting an item, the order of the remaining items should be adjusted accordingly.
    export async function moveTechStack(
  _prevState: TechStackActionState,
  formData: FormData,
): Promise<TechStackActionState> {
  await requireAdmin();

  const idValue = formData.get("id");
  const directionValue = formData.get("direction");

  if (
    typeof idValue !== "string" ||
    !idValue.trim()
  ) {
    return {
      error: "Technology ID is required.",
    };
  }

  if (
    directionValue !== "up" &&
    directionValue !== "down"
  ) {
    return {
      error: "Invalid move direction.",
    };
  }

  const techStacks = await prisma.techStack.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
  });

  const currentIndex = techStacks.findIndex(
    (tech) => tech.id === idValue,
  );

  if (currentIndex === -1) {
    return {
      error: "Technology not found.",
    };
  }

  const targetIndex =
    directionValue === "up"
      ? currentIndex - 1
      : currentIndex + 1;

  if (
    targetIndex < 0 ||
    targetIndex >= techStacks.length
  ) {
    return {
      error:
        directionValue === "up"
          ? "This technology is already at the top."
          : "This technology is already at the bottom.",
    };
  }

  const reordered = [...techStacks];

  const [current] = reordered.splice(currentIndex, 1);

  reordered.splice(targetIndex, 0, current);

  await prisma.$transaction(
    reordered.map((tech, index) =>
      prisma.techStack.update({
        where: {
          id: tech.id,
        },
        data: {
          order: index,
        },
      }),
    ),
  );

  revalidatePath("/admin/tech-stack");

  return {
    success: "Technology order updated successfully.",
  };
}