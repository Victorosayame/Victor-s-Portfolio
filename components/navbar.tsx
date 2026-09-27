"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5">
      <div
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-6 transition-all duration-300 ${
          scrolled
            ? "border-[#c8a75a]/80 bg-[#f7f4ed]/80 backdrop-blur-[2px]"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Bishop
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          className="hidden rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium md:inline-flex hover:border-[var(--color-accent)] transition-colors"
        >
          Let's talk
        </Link>
      </div>
    </header>
  );
}