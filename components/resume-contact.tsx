import type { PortfolioContent } from "@/lib/portfolio-content";

type Props = {
  content: PortfolioContent;
};

export default function ResumeContact({ content }: Props) {
  return (
    <section
      id="resume"
      className="portfolio-container portfolio-section-large"
    >
      <div className="portfolio-panel overflow-hidden rounded-[28px]">
        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left */}
          <div className="p-8 md:p-12">
            <p className="portfolio-kicker">Resume</p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-[var(--color-text)]">
              Let’s build something meaningful together.
            </h2>

            <p className="portfolio-copy mt-6">
              I’m open to frontend engineering, full stack development,
              and product-focused opportunities. Whether you’re hiring,
              collaborating, or simply want to connect—I’d love to hear from you.
            </p>

            <div className="portfolio-actions mt-10">
              {content.resume.status === "ready" ? (
                <>
                  <a
                    href={content.resume.viewHref!}
                    className="portfolio-button portfolio-button-primary"
                  >
                    View Resume
                  </a>

                  <a
                    href={content.resume.downloadHref!}
                    className="portfolio-button portfolio-button-secondary"
                  >
                    Download PDF
                  </a>
                </>
              ) : (
                <div className="portfolio-pending rounded-2xl p-5">
                  <p className="font-medium">Resume coming before launch</p>
                  <p className="mt-2 text-sm">
                    The download and preview actions are already wired into the
                    portfolio and will activate once the final PDF is added.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div
            id="contact"
            className="bg-[var(--color-surface-muted)] p-8 md:p-10"
          >
            <p className="portfolio-kicker">Contact</p>

            <div className="mt-8 space-y-6">
              {content.contactLinks.map((item) => (
                <div key={item.label}>
                  <p className="text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
                    {item.label}
                  </p>

                  {item.status === "ready" ? (
                    <a
                      href={item.href}
                      className="mt-2 block text-lg font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {item.href.replace("mailto:", "")}
                    </a>
                  ) : (
                    <p className="mt-2 text-[var(--color-text-muted)]">
                      {item.pendingMessage}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-[var(--color-border)] pt-6">
              <p className="text-sm text-[var(--color-text-muted)]">
                Usually replies within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}