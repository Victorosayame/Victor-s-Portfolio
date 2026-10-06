import { getPublicContacts } from "@/lib/portfolio/get-public-contact";
import { getPublicResume } from "@/lib/portfolio/get-public-resume";
import CopyEmailButton from "./copy-email-button";

export default async function ResumeContact() {
  const [resume, contacts] = await Promise.all([
    getPublicResume(),
    getPublicContacts(),
  ]);

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
              I’m open to frontend engineering, full stack development, and
              product-focused opportunities. Whether you’re hiring,
              collaborating, or simply want to connect—I’d love to hear from
              you.
            </p>

            <div className="portfolio-actions mt-10">
              {resume ? (
                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="portfolio-button portfolio-button-primary"
                >
                  View Resume
                </a>
              ) : (
                <div className="portfolio-pending rounded-2xl p-5">
                  <p className="font-medium">Resume coming before launch</p>

                  <p className="mt-2 text-sm">
                    The resume will become available once the final PDF has been
                    uploaded.
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
              {contacts.map((item) => {
                const isEmail = item.type === "EMAIL";

                const displayValue = isEmail
                  ? item.href.replace("mailto:", "")
                  : item.href;

                return (
                  <div key={item.id}>
                    <p className="text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
                      {item.label}
                    </p>

                    {isEmail ? (
                      <div className="mt-2 flex items-center gap-3">
                        <p className="text-lg font-medium text-[var(--color-text)]">
                          {displayValue}
                        </p>

                        <CopyEmailButton email={displayValue} />
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 block text-lg font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {displayValue}
                      </a>
                    )}
                  </div>
                );
              })}
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
