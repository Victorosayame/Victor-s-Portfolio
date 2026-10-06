import z from "zod";


export const profileSchema = z.object({
    preferredName: z.string().trim().min(2).max(50, "Name is too long."),

    fullName: z.string().trim().min(2, "Full name is required.").max(100, "Full name is too long."),

    headline: z.string().trim().min(1, "Headline is required.").max(200, "Headline is too long."),

    bio: z.string().trim().min(1, "Bio is required.").max(5000, "Bio is too long."),

    location: z.string().trim().min(1, "Location is required.").max(100, "Location is too long."),

    photoUrl: z.union([
        z.url().trim(),
        z.literal(""),
    ]),

    availability: z.string().trim().max(100, "Availability is too long.").optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>;


export const techStackSchema = z.object({
    name: z.string().trim().min(1, "Tech stack name is required.").max(100, "Tech stack name is too long."),
    
    category: z.enum([
        "FRONTEND",
        "BACKEND",
        "DATABASE",
        "TOOL",
    ]),

    order: z.coerce.number().int("Order must be a whole number.").min(0, "Order cannot be negative."),
});

export type TechStackFormValues = z.infer<typeof techStackSchema>;

export const projectSchema = z.object({
    title: z.string().trim().min(1, "Project title is required.").max(100, "Project title is too long."),

    role: z.string().trim().min(1, "Project role is required.").max(100, "Project role is too long."),

    summary: z.string().trim().min(1, "Project summary is required.").max(5000, "Project summary is too long."),

    outcome: z.string().trim().min(1, "Project outcome is required.").max(5000, "Project outcome is too long."),

    imageUrl: z.union([
        z.url().trim(),
        z.literal(""),
    ]),
    liveUrl: z.union([
        z.url().trim(),
        z.literal(""),
    ]),
    repoUrl: z.union([
        z.url().trim(),
        z.literal(""),
    ]),
    caseStudyUrl: z.union([
        z.url().trim(),
        z.literal(""),
    ]),

    featured: z.boolean(),

    order: z.coerce.number().int("Order must be a whole number.").min(0, "Order cannot be negative."),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const resumeSchema = z.object({
    fileName: z.string().trim().min(1, "Resume file name is required").max(160, "Resume file name is too long"),

    fileUrl: z.url().trim(),
})

export type ResumeFormValues = z.infer<typeof resumeSchema>;


export const contactSchema = z
  .object({
    label: z
      .string()
      .trim()
      .min(1, "Contact label is required.")
      .max(80, "Contact label is too long."),

    href: z
      .string()
      .trim()
      .min(1, "Contact value is required."),

    type: z.enum([
      "EMAIL",
      "GITHUB",
      "LINKEDIN",
      "X",
      "OTHER",
    ]),
  })

export type ContactFormValues =
  z.infer<typeof contactSchema>;