import {
  getFeaturedProjects,
  getReadyProjectLinks,
  type PortfolioContent,
} from "@/lib/portfolio-content";

type Props = {
  content: PortfolioContent;
};

export default function WorkSection({ content }: Props) {
  const projects = getFeaturedProjects(content);

  return (
    <section
      id="work"
      className="portfolio-container portfolio-section-large"
    >
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

      <div className="space-y-6">
        {projects.map((project, index) => {
          const links = getReadyProjectLinks(project);

          return (
            <article
              key={project.title}
              className="portfolio-panel grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr]"
            >
              {/* Left */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-sm font-medium text-[var(--color-accent)]">
                    0{index + 1}
                  </span>

                  <div className="h-px flex-1 bg-[var(--color-border)]" />
                </div>

                <p className="portfolio-kicker">{project.role}</p>

                <h3 className="mt-3 text-3xl font-bold text-[var(--color-text)]">
                  {project.title}
                </h3>

                <p className="portfolio-copy mt-5">
                  {project.summary}
                </p>

                <div className="portfolio-chip-list mt-8">
                  {project.stack.map((tech) => (
                    <span key={tech} className="portfolio-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col justify-between rounded-2xl bg-[var(--color-surface-muted)] p-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
                    Outcome
                  </p>

                  <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
                    {project.outcome}
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {links.length > 0 ? (
                    links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
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
            </article>
          );
        })}
      </div>
    </section>
  );
}