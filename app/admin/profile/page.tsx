import { prisma } from "@/lib/auth/prisma"
import ProfileForm from "../components/profile-form";

const PROFILE_ID = process.env.PROFILE_ID; //Because this is a single owner portfolio, we will use a fixed application-level ID for the profile. This is a design choice that simplifies the data model and access patterns.,this is for development only, in production we will use a more secure and dynamic approach to identify the profile from db.

const ProfilePage = async () => {

  const profile = await prisma.profile.findUnique({
    where: {
      id: PROFILE_ID,
    },
  })
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-accent">
          Portfolio
        </p>

        <h1 className="mt-2 text-3xl font-bold text-foreground">
          Profile
        </h1>

        <p className="mt-2 max-w-2xl text-text-muted">
          Manage the information displayed on your public portfolio.
        </p>
      </div>

      <ProfileForm
        profile={{
          preferredName: profile?.preferredName ?? "",
          fullName: profile?.fullName ?? "",
          headline: profile?.headline ?? "",
          bio: profile?.bio ?? "",
          location: profile?.location ?? "",
          photoUrl: profile?.photoUrl ?? "",
          availability: profile?.availability ?? "",
        }}
      />
    </div>
  )
}

export default ProfilePage