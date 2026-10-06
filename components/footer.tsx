export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="portfolio-container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">
            © {new Date().getFullYear()} Bishop
          </p>

          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Frontend & Full Stack Developer
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm text-[var(--color-text-muted)]">
          <a
            href="#work"
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            Work
          </a>

          <a
            href="#resume"
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            Resume
          </a>

          <a
            href="#contact"
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
