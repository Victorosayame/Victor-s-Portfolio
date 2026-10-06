"use client"

import { logout } from "@/actions/auth";
import { FileText, FolderKanban, Layers3, LayoutDashboard, LogOut, Mail, Menu, PanelLeftClose, PanelLeftOpen, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Profile",
        href: "/admin/profile",
        icon: UserRound,
    },
    {
        label: "Projects",
        href: "/admin/projects",
        icon: FolderKanban,
    },
    {
        label: "Tech Stack",
        href: "/admin/techstack",
        icon: Layers3,
    },
    {
        label: "Resume",
        href: "/admin/resume",
        icon: FileText,
    },
    {
        label: "Contact",
        href: "/admin/contact",
        icon: Mail,
    },
];

type AdminShellProps = {
    children: React.ReactNode;
    adminName: string;
};


export default function AdminShell({
    children,
    adminName,
}: AdminShellProps) {

    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "admin";
        }

        return pathname.startsWith(href);
    };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex flex-col",
          "border-r border-border bg-surface/95 backdrop-blur-xl",
          "shadow-[0_10px_40px_rgb(47_58_72_/_0.06)]",
          "transition-[width,transform] duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-20" : "w-64",
        ].join(" ")}
      >
        {/* Brand */}
        <div
          className={[
            "flex h-16 shrink-0 items-center border-b border-border",
            collapsed ? "justify-center px-3" : "justify-between px-5",
          ].join(" ")}
        >
          {collapsed ? (
            <Link
              href="/admin"
              aria-label="Bishop CMS"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm"
            >
              B
            </Link>
          ) : (
            <>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
                  {adminName.charAt(0).toUpperCase()}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {adminName}
                  </p>

                  <p className="truncate text-xs text-text-muted">
                    Portfolio CMS
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setCollapsed(true)}
                aria-label="Collapse sidebar"
                className="hidden h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted hover:text-foreground lg:flex"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted hover:text-foreground lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Re-open button when collapsed */}
        {collapsed && (
          <div className="hidden px-3 pt-3 lg:block">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              className="flex h-10 w-full items-center justify-center rounded-xl border border-border bg-surface-muted text-text-muted hover:border-border-strong hover:text-foreground"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.label : undefined}
                  className={[
                    "group flex min-h-11 items-center rounded-xl",
                    "transition-colors duration-180",
                    collapsed ? "justify-center px-2" : "gap-3 px-3",
                    active
                      ? "bg-accent text-white shadow-[0_8px_20px_rgb(200_167_90_/_0.18)]"
                      : "text-text-muted hover:bg-surface-muted hover:text-foreground",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-[18px] w-[18px] shrink-0",
                      active
                        ? "text-white"
                        : "text-text-muted group-hover:text-foreground",
                    ].join(" ")}
                  />

                  {!collapsed && (
                    <span className="truncate text-sm font-medium">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div
          className={[
            "border-t border-border p-3",
            collapsed ? "flex justify-center" : "",
          ].join(" ")}
        >
          <form action={logout}>
            <button
              type="submit"
              title={collapsed ? "Logout" : undefined}
              className={[
                "flex min-h-11 items-center rounded-xl",
                "text-text-muted transition-colors duration-180",
                "hover:bg-red-50 hover:text-red-600",
                collapsed ? "w-11 justify-center" : "w-full gap-3 px-3",
              ].join(" ")}
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" />

              {!collapsed && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </form>
        </div>
      </aside>

      {/* Main shell */}
      <div
        className={[
          "min-h-screen transition-[padding] duration-200",
          collapsed ? "lg:pl-20" : "lg:pl-64",
        ].join(" ")}
      >
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-surface/90 px-4 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground hover:border-border-strong"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/admin" className="ml-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
              {adminName.charAt(0).toUpperCase()}
            </span>

            <span className="text-sm font-semibold text-foreground">
              {adminName}
            </span>

            <span className="text-sm font-semibold text-foreground">
              Portfolio CMS
            </span>
          </Link>
        </header>

        <main className="min-h-screen p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
