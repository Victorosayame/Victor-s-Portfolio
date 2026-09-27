"use server";

import { prisma } from "@/lib/auth/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { ProfileFormValues, profileSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

const PROFILE_ID = process.env.PROFILE_ID; //Because this is a single owner portfolio, we will use a fixed application-level ID for the profile. This is a design choice that simplifies the data model and access patterns.,this is for development only, in production we will use a more secure and dynamic approach to identify the profile from db.

export type ProfileActionState = {
    error?: string;
    success?: string;
}

export async function saveProfile(
    _prevState: ProfileActionState,
    formData: FormData,
): Promise<ProfileActionState> {
    await requireAdmin(); // Ensure the user is authenticated and authorized to perform this action.

    const rawData = Object.fromEntries(formData.entries());

    const result = profileSchema.safeParse(rawData);

    if (!result.success) {
        return {
            error: result.error.issues[0]?.message ?? "Please check the profile fields"
        };
    }

    const data: ProfileFormValues = result.data;

    await prisma.profile.upsert({
        where: {
            id: PROFILE_ID,
        },

        update: {
            preferredName: data.preferredName,
      fullName: data.fullName,
      headline: data.headline,
      bio: data.bio,
      location: data.location,
      photoUrl: data.photoUrl || null,
      availability: data.availability || null,
        },

        create: {
      id: PROFILE_ID,
      preferredName: data.preferredName,
      fullName: data.fullName,
      headline: data.headline,
      bio: data.bio,
      location: data.location,
      photoUrl: data.photoUrl || null,
      availability: data.availability || null,
    },
    });

    revalidatePath("/");
    revalidatePath("/admin/profile");

    return {
        success: "Profile saved successfully."
    }
}