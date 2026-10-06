import { prisma } from "@/lib/auth/prisma";
import AdminShell from "./components/admin-shell";
import { requireAdmin } from "@/lib/auth/session";

const PROFILE_ID = process.env.PROFILE_ID; //Because this is a single owner portfolio, we will use a fixed application-level ID for the profile. This is a design choice that simplifies the data model and access patterns.,this is for development only, in production we will use a more secure and dynamic approach to identify the profile from db.

export const metadata = {
  title: "Admin",
  description: "Admin dashboard for managing the portfolio.",
}

export default async function AdminRootLayout({ children }: LayoutProps<"/admin">) {
   await requireAdmin();

   const profile = await prisma.profile.findUnique({
     where: {
       id: PROFILE_ID,
     },
     select: {
       preferredName: true,
       fullName: true,
     },
   });

   const adminName =
     profile?.preferredName?.trim() || profile?.fullName?.trim() || "Portfolio";
  return <AdminShell adminName={adminName}>
    {children}
  </AdminShell>
}
