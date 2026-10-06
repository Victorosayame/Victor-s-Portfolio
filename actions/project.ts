"use server";

import { prisma } from "@/lib/auth/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { ProjectFormValues, projectSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export type ProjectActionState = {
    error?: string;
    success?: string;
}

export async function createProject(
    _prevState: ProjectActionState,
    formData: FormData,
): Promise<ProjectActionState> {
    await requireAdmin(); // Ensure the user is authenticated and authorized to perform this action.
    const rawData = Object.fromEntries(formData.entries());

  const normalizedData = {
        ...rawData,
        imageUrl: rawData.imageUrl ?? "",
        liveUrl: rawData.liveUrl ?? "",
        repoUrl: rawData.repoUrl ?? "",
        caseStudyUrl: rawData.caseStudyUrl ?? "",
        featured: rawData.featured === "true",
        order: rawData.order ?? "0",
   };

const result = projectSchema.safeParse(normalizedData);

    if (!result.success) {
        return {
            error: result.error.issues[0]?.message ?? "Please check the project fields"
        };
    }

    const data: ProjectFormValues = result.data;

    // Here you would typically save the project data to your database.
    await prisma.project.create({
    data: {
      title: data.title,
      role: data.role,
      summary: data.summary,
      outcome: data.outcome,
      imageUrl: data.imageUrl || null,
      liveUrl: data.liveUrl || null,
      repoUrl: data.repoUrl || null,
      caseStudyUrl: data.caseStudyUrl || null,
      featured: data.featured,
      order: data.order,
    },
  });

  revalidatePath("/admin/projects");

     
    return {
        success: "Project created successfully."
    };
    }

    export async function updateProject(
        _prevState: ProjectActionState,
        formData: FormData,
    ): Promise<ProjectActionState> {
        await requireAdmin();

        const idValue = formData.get("id");
        
        if (
            typeof idValue !== "string" ||
            !idValue.trim()
        ) {
            return {
            error: "Project ID is required.",
            };
        }

        const rawData = Object.fromEntries(formData.entries());

        const normalizedData = {
            ...rawData,
            imageUrl: rawData.imageUrl ?? "",
            liveUrl: rawData.liveUrl ?? "",
            repoUrl: rawData.repoUrl ?? "",
            caseStudyUrl: rawData.caseStudyUrl ?? "",
            featured: rawData.featured === "true",
            order: rawData.order ?? "0",
        };

        const result = projectSchema.safeParse(
            normalizedData,
        );

        if(!result.success) {
            return {
                error: result.error.issues[0]?.message ?? "Please check the project fields"
            }
        }

        const data = result.data;

        try {
            await prisma.project.update({
                where: {
                    id: idValue,
                },
                data: {
                    title: data.title,
                    role: data.role,
                    summary: data.summary,
                    outcome: data.outcome,
                    imageUrl: data.imageUrl || null,
                    liveUrl: data.liveUrl || null,
                    repoUrl: data.repoUrl || null,
                    caseStudyUrl: data.caseStudyUrl || null,
                    featured: data.featured,
                    order: data.order,
                }
            })
        } catch {
            return {
                error: "Unable to update project."
            }
        }

        revalidatePath("/admin/projects");

        return {
            success: "Project updated successfully"
        }
    }

    export async function deleteProject(
        _prevState: ProjectActionState,
        formData: FormData,
    ): Promise<ProjectActionState> {
        await requireAdmin()

        const idValue = formData.get("id");

        try {
            if (typeof idValue !== "string" || !idValue.trim()) {
                return {
                    error: "Invalid project ID."
                }
            }
            await prisma.project.delete({
                where: { id: idValue },
            })
        } catch {
            return {
                error: "Failed to delete project."
            }
        }

        revalidatePath("/admin/projects");

        return {
            success: "Project deleted successfully."
        }
    }

    export async function setProjectFeatured(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdmin();

  const idValue = formData.get("id");
  const featuredValue = formData.get("featured");

  if (
    typeof idValue !== "string" ||
    !idValue.trim()
  ) {
    return {
      error: "Project ID is required.",
    };
  }

  if (
    featuredValue !== "true" &&
    featuredValue !== "false"
  ) {
    return {
      error: "Invalid featured value.",
    };
  }

  const featured = featuredValue === "true";

  try {
    await prisma.project.update({
      where: {
        id: idValue,
      },
      data: {
        featured,
      },
    });
  } catch {
    return {
      error: "Unable to update the featured status.",
    };
  }

  revalidatePath("/admin/projects");

  return {
    success: featured
      ? "Project marked as featured."
      : "Project removed from featured projects.",
  };
}

export async function moveProject(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdmin();

  const idValue = formData.get("id");
  const directionValue = formData.get("direction");

  if (
    typeof idValue !== "string" ||
    !idValue.trim()
  ) {
    return {
      error: "Project ID is required.",
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

  const projects = await prisma.project.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
  });

  const currentIndex = projects.findIndex(
    (project) => project.id === idValue,
  );

  if (currentIndex === -1) {
    return {
      error: "Project not found.",
    };
  }

  const targetIndex =
    directionValue === "up"
      ? currentIndex - 1
      : currentIndex + 1;

  if (
    targetIndex < 0 ||
    targetIndex >= projects.length
  ) {
    return {
      error:
        directionValue === "up"
          ? "This project is already at the top."
          : "This project is already at the bottom.",
    };
  }

  const reordered = [...projects];

  const [currentProject] = reordered.splice(
    currentIndex,
    1,
  );

  reordered.splice(
    targetIndex,
    0,
    currentProject,
  );

  await prisma.$transaction(
    reordered.map((project, index) =>
      prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          order: index,
        },
      }),
    ),
  );

  revalidatePath("/admin/projects");

  return {
    success: "Project order updated successfully.",
  };
}