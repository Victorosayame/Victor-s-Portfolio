import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  FileText,
  FolderKanban,
  Mail,
  Star,
  UserRound,
} from "lucide-react";

import { prisma } from "@/lib/auth/prisma";
import { requireAdmin } from "@/lib/auth/session";

const RESUME_ID = process.env.RESUME_ID;

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [
    profile,
    projectCount,
    featuredProjectCount,
    techStackCount,
    contactCount,
    resume,
  ] = await Promise.all([
    prisma.profile.findFirst({
      orderBy: {
        createdAt: "asc",
      },
    }),

    prisma.project.count(),

    prisma.project.count({
      where: {
        featured: true,
      },
    }),

    prisma.techStack.count(),

    prisma.contact.count(),

    RESUME_ID
      ? prisma.resume.findUnique({
          where: {
            id: RESUME_ID,
          },
        })
      : null,
  ]);

  const profileReady = Boolean(
    profile?.preferredName &&
    profile?.fullName &&
    profile?.headline &&
    profile?.bio &&
    profile?.location,
  );

  const techStackReady = techStackCount > 0;
  const projectsReady = featuredProjectCount > 0;
  const resumeReady = Boolean(resume?.fileUrl);
  const contactsReady = contactCount > 0;

  const stats = [
    {
      label: "Projects",
      value: projectCount,
      description:
        featuredProjectCount === 1
          ? "1 featured project"
          : `${featuredProjectCount} featured projects`,
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Tech Stack",
      value: techStackCount,
      description: "Technologies configured",
      href: "/admin/tech-stack",
      icon: Code2,
    },
    {
      label: "Contacts",
      value: contactCount,
      description:
        contactCount === 1 ? "1 contact link" : `${contactCount} contact links`,
      href: "/admin/contacts",
      icon: Mail,
    },
    {
      label: "Resume",
      value: resumeReady ? "Ready" : "Missing",
      description: resumeReady
        ? (resume?.fileName ?? "Resume uploaded")
        : "Upload your current resume",
      href: "/admin/resume",
      icon: FileText,
    },
  ];

  const statusItems = [
    {
      label: "Profile",
      ready: profileReady,
      href: "/admin/profile",
      message: profileReady ? "Ready" : "Needs setup",
    },
    {
      label: "Tech Stack",
      ready: techStackReady,
      href: "/admin/tech-stack",
      message: techStackReady ? "Ready" : "Add technologies",
    },
    {
      label: "Projects",
      ready: projectsReady,
      href: "/admin/projects",
      message: projectsReady
        ? `${featuredProjectCount} featured`
        : "Add your projects",
    },
    {
      label: "Resume",
      ready: resumeReady,
      href: "/admin/resume",
      message: resumeReady ? "Uploaded" : "Upload resume",
    },
    {
      label: "Contacts",
      ready: contactsReady,
      href: "/admin/contacts",
      message: contactsReady ? "Ready" : "Add contact links",
    },
  ];

  return (
    <main className="space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">Portfolio CMS</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Welcome back
            {profile?.preferredName ? `, ${profile.preferredName}` : ""}.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
            Keep your portfolio content, projects, resume, and contact
            information up to date from one place.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted"
        >
          View portfolio
          <ExternalLink className="h-4 w-4" />
        </Link>
      </section>

      {/* Overview stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group portfolio-panel p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgb(200_167_90_/_0.12)] text-accent">
                  <Icon className="h-5 w-5" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>

              <p className="mt-5 text-sm font-medium text-text-muted">
                {stat.label}
              </p>

              <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </p>

              <p className="mt-2 truncate text-xs text-text-soft">
                {stat.description}
              </p>
            </Link>
          );
        })}
      </section>

      {/* Main dashboard grid */}
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        {/* Portfolio status */}
        <div className="portfolio-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Portfolio health
              </p>

              <h2 className="mt-1 text-lg font-semibold text-foreground">
                Content status
              </h2>
            </div>

            <UserRound className="h-5 w-5 text-text-soft" />
          </div>

          <div className="divide-y divide-border">
            {statusItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-surface-muted"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                      item.ready
                        ? "bg-green-50 text-green-600"
                        : "bg-[rgb(200_167_90_/_0.12)] text-accent",
                    ].join(" ")}
                  >
                    {item.ready ? "✓" : "!"}
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-xs text-text-soft">
                      {item.message}
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-text-soft" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="portfolio-panel overflow-hidden">
          <div className="border-b border-border px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Shortcuts
            </p>

            <h2 className="mt-1 text-lg font-semibold text-foreground">
              Quick actions
            </h2>
          </div>

          <div className="space-y-2 p-4">
            <Link
              href="/admin/profile"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-surface-muted"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted text-text-muted">
                  <UserRound className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Edit profile
                  </p>

                  <p className="text-xs text-text-soft">
                    Update your public identity
                  </p>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/admin/projects"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-surface-muted"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted text-text-muted">
                  <FolderKanban className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Manage projects
                  </p>

                  <p className="text-xs text-text-soft">
                    Add or update your work
                  </p>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/admin/tech-stack"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-surface-muted"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted text-text-muted">
                  <Code2 className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Manage tech stack
                  </p>

                  <p className="text-xs text-text-soft">
                    Keep your skills current
                  </p>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/admin/resume"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-surface-muted"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted text-text-muted">
                  <FileText className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Manage resume
                  </p>

                  <p className="text-xs text-text-soft">
                    Upload your latest PDF
                  </p>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/admin/contacts"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-surface-muted"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted text-text-muted">
                  <Mail className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Manage contacts
                  </p>

                  <p className="text-xs text-text-soft">
                    Email and social links
                  </p>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects summary */}
      <section className="portfolio-panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Work
            </p>

            <h2 className="mt-1 text-lg font-semibold text-foreground">
              Featured projects
            </h2>
          </div>

          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Manage projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-muted p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(200_167_90_/_0.12)] text-accent">
                <Star className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">Featured</p>

                <p className="text-xs text-text-soft">
                  Projects currently shown as featured
                </p>
              </div>
            </div>

            <p className="mt-5 text-3xl font-semibold text-foreground">
              {featuredProjectCount}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-muted p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(200_167_90_/_0.12)] text-accent">
                <FolderKanban className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Total projects
                </p>

                <p className="text-xs text-text-soft">
                  All projects stored in the CMS
                </p>
              </div>
            </div>

            <p className="mt-5 text-3xl font-semibold text-foreground">
              {projectCount}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
