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