import AdminShell from "./components/admin-shell";

export const metadata = {
  title: "Admin",
  description: "Admin dashboard for managing the portfolio.",
}

export default async function AdminRootLayout({ children }: LayoutProps<"/admin">) {

   
  return <AdminShell>
    {children}
  </AdminShell>
}
