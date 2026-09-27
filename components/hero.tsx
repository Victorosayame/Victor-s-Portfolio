import { getPrimaryAction, type PortfolioContent } from "@/lib/portfolio-content";
import HeroVisual from "./hero-visual";

type HeroProps = {
  content: PortfolioContent;
};

export default function Hero({ content }: HeroProps) {
  const primaryAction = getPrimaryAction(content);

  return (
    <section className="portfolio-container portfolio-hero portfolio-reveal relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(244,193,106,0.08),transparent_38%)]" />

      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
  {/* LEFT SIDE */}
  <div className="max-w-3xl">
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        Available for opportunities
      </p>
    </div>

    <p className="portfolio-kicker">{content.profile.fullName}</p>

    <h1 className="portfolio-heading-hero mt-4">
      {content.profile.preferredName}
    </h1>

    <h2 className="mt-6 max-w-3xl text-2xl font-medium leading-snug text-[var(--color-text)] md:text-4xl">
      {content.profile.headline}
    </h2>

    <p className="portfolio-copy mt-8">
      {content.profile.shortBio}
    </p>

    <div className="portfolio-actions mt-10">
      <a
        href={primaryAction.href}
        className="portfolio-button portfolio-button-primary"
      >
        {primaryAction.label}
      </a>

      <a
        href="#resume"
        className="portfolio-button portfolio-button-secondary"
      >
        Resume
      </a>
    </div>

    <div className="mt-14 flex flex-wrap gap-8 border-t border-[var(--color-border)] pt-8">
      <div>
        <p className="text-xs uppercase tracking-[0.1em] text-[var(--color-text-soft)]">
          Based in
        </p>
        <p className="mt-2 font-medium">{content.profile.location}</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.1em] text-[var(--color-text-soft)]">
          Focus
        </p>
        <p className="mt-2 font-medium">Frontend & Full Stack</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.1em] text-[var(--color-text-soft)]">
          Primary stack
        </p>
        <p className="mt-2 font-medium">React · Next.js · TypeScript</p>
      </div>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <HeroVisual />
</div>
    </section>
  );
}