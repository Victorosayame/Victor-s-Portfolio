import { getPriorWork, type PortfolioContent } from "@/lib/portfolio-content";

type Props = {
  content: PortfolioContent;
};

export default function PriorWork({ content }: Props) {
  const project = getPriorWork(content)[0];

  if (!project) return null;

  return (
    <section className="portfolio-container portfolio-section">
      <div className="mb-10 max-w-2xl">
        <p className="portfolio-kicker">Earlier Journey</p>

        <h2 className="portfolio-heading-section mt-3">
          Every project shaped the next one.
        </h2>

        <p className="portfolio-copy mt-5">
          Before this portfolio, I built an animated macOS-inspired experience.
          It remains part of my journey—not the direction of my current design.
        </p>
      </div>

      <div className="portfolio-panel p-8">
        <div className="grid gap-8 lg:grid-cols-[140px_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]">
              Prior Work
            </p>

            <div className="mt-6 h-24 w-px bg-[var(--color-border)]" />

            <p className="mt-4 text-sm text-[var(--color-text-soft)]">
              Portfolio Archive
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[var(--color-text)]">
              {project.title}
            </h3>

            <p className="portfolio-copy mt-5">
              {project.summary}
            </p>

            <p className="mt-8 text-base leading-7 text-[var(--color-text-muted)]">
              {project.outcome}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  className="portfolio-button portfolio-button-secondary"
                >
                  View Archived Portfolio
                </a>
              ) : (
                <span className="portfolio-pending rounded-full px-4 py-2 text-sm">
                  Archive link coming before launch
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}