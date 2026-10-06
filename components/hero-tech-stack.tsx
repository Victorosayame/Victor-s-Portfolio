import { getPublicTechStack } from "@/lib/portfolio/get-public-tech-stack";

const categories = [
  {
    key: "FRONTEND",
    label: "Frontend",
    description: "Interfaces, experiences, and client-side applications.",
  },
  {
    key: "BACKEND",
    label: "Backend",
    description: "APIs, services, authentication, and application logic.",
  },
  {
    key: "DATABASE",
    label: "Database",
    description: "Data storage, modeling, and database tooling.",
  },
  {
    key: "TOOL",
    label: "Tools",
    description: "Development, deployment, and workflow tools.",
  },
] as const;

export default async function TechStackSection() {
  const stacks = await getPublicTechStack();

  return (
    <section
      id="stack"
      className="portfolio-container border-t border-[var(--color-border)] py-24"
    >
      <div className="max-w-3xl">
        <p className="portfolio-kicker">Technology</p>

        <h2 className="portfolio-heading-section mt-3">
          The tools I use to build
        </h2>

        <p className="portfolio-copy mt-5">
          A practical stack focused on building modern, reliable, and scalable
          digital products.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {categories.map((category) => {
          const categoryStacks = stacks.filter(
            (stack) => stack.category === category.key,
          );

          if (categoryStacks.length === 0) {
            return null;
          }

          return (
            <div
              key={category.key}
              className="rounded-3xl border border-[var(--color-border)] bg-white p-6"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-lg font-semibold text-[var(--color-text)]">
                    {category.label}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                    {category.description}
                  </p>
                </div>

                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
                  {categoryStacks.length}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {categoryStacks.map((stack) => (
                  <span
                    key={stack.id}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-text)]"
                  >
                    {stack.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
