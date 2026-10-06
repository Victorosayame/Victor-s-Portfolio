import { getPublicProjects } from "@/lib/portfolio/get-public-projects";

function getProjectLinks(project: {
  liveUrl: string | null;
  repoUrl: string | null;
  caseStudyUrl: string | null;
}) {
  const links = [];

  if (project.liveUrl) {
    links.push({
      label: "Live site",
      href: project.liveUrl,
    });
  }

  if (project.repoUrl) {
    links.push({
      label: "GitHub",
      href: project.repoUrl,
    });
  }

  if (project.caseStudyUrl) {
    links.push({
      label: "Case study",
      href: project.caseStudyUrl,
    });
  }

  return links;
}

export default async function WorkSection() {
  const projects = await getPublicProjects();

  return (
    <section id="work" className="portfolio-container portfolio-section-large">
      <div className="mb-14 max-w-3xl">
        <p className="portfolio-kicker">Selected Work</p>

        <h2 className="portfolio-heading-section mt-3">
          Products designed with clarity, performance and thoughtful UX.
        </h2>

        <p className="portfolio-copy mt-5">
          Three projects that best represent my approach to frontend
          engineering—from real-time dashboards to secure banking experiences.
        </p>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => {
          const links = getProjectLinks(project);

          return (
            <article
              key={project.id}
              className="portfolio-panel overflow-hidden p-6 md:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                {/* LEFT */}
                <div className="flex flex-col">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-sm font-medium text-[var(--color-accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="h-px flex-1 bg-[var(--color-border)]" />
                  </div>

                  <p className="portfolio-kicker">{project.role}</p>

                  <h3 className="mt-3 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
                    {project.title}
                  </h3>

                  <p className="portfolio-copy mt-5">{project.summary}</p>

                  <div className="mt-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
                      Outcome and Tech Stack
                    </p>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
                      {project.outcome}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-3">
                    {links.length > 0 ? (
                      links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="portfolio-button portfolio-button-secondary"
                        >
                          {link.label}
                        </a>
                      ))
                    ) : (
                      <span className="portfolio-pending rounded-full px-4 py-2 text-sm">
                        Case study coming soon
                      </span>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-stretch">
                  <div className="w-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} project preview`}
                        className="h-full min-h-[300px] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-text)]">
                            {project.title}
                          </p>

                          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                            Project preview coming soon
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
