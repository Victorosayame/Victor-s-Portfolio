"use client";

import { createTechStack, type TechStackActionState } from "@/actions/tech-stack";
import { useActionState } from "react";


type TechStack = {
    id: string;
    name: string;
    category: "FRONTEND" | "BACKEND" | "DATABASE" | "TOOL";
    order: number;
};

type TechStackManagerProps = {
    techStacks: TechStack[];
};

const initialState: TechStackActionState = {};


const TechStackManager = ({ techStacks }: TechStackManagerProps) => {

     const [state, formAction, isPending] = useActionState(
    createTechStack,
    initialState,
  );
  return (
    <div className="space-y-6">
      <section className="portfolio-panel p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Add technology
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            Add a technology to your portfolio stack.
          </p>
        </div>

        <form
          action={formAction}
          className="grid gap-4 sm:grid-cols-[1fr_180px_120px_auto]"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Technology
            </label>

            <input
              id="name"
              name="name"
              required
              placeholder="React"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              defaultValue="FRONTEND"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            >
              <option value="FRONTEND">Frontend</option>
              <option value="BACKEND">Backend</option>
              <option value="DATABASE">Database</option>
              <option value="TOOL">Tool</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="order"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Order
            </label>

            <input
              id="order"
              name="order"
              type="number"
              min="0"
              defaultValue="0"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isPending}
              className="portfolio-button portfolio-button-primary w-full sm:w-auto"
            >
              {isPending ? "Adding..." : "Add"}
            </button>
          </div>
        </form>

        {state.error && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-600"
          >
            {state.error}
          </p>
        )}

        {state.success && (
          <p
            role="status"
            className="mt-4 text-sm text-green-600"
          >
            {state.success}
          </p>
        )}
      </section>

      <section className="portfolio-panel overflow-hidden">
        <div className="border-b border-border px-6 py-5">
          <h2 className="text-lg font-semibold text-foreground">
            Technologies
          </h2>
        </div>

        {techStacks.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-text-muted">
              No technologies have been added yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {techStacks.map((tech) => (
              <div
                key={tech.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground">
                    {tech.name}
                  </p>

                  <p className="mt-1 text-sm text-text-muted">
                    {tech.category}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-soft">
                    Order {tech.order}
                  </span>

                  <button
                    type="button"
                    disabled
                    className="text-sm font-medium text-text-muted"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>  
  );
}

export default TechStackManager