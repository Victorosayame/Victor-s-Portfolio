import { prisma } from "../auth/prisma";


const PROFILE_ID = process.env.PROFILE_ID;

export async function getPublicProfile() {
    return await prisma.profile.findUnique({
        where: {
            id: PROFILE_ID,
        },
        select: {
            preferredName: true,
            fullName: true,
            headline: true,
            bio: true,
            location: true,
            photoUrl: true,
            availability: true,
        },
    });
}