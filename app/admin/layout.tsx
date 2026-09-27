import AdminShell from "./components/admin-shell";


export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>
    {children}
  </AdminShell>
}
