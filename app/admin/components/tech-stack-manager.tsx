"use client";

import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import {
  createTechStack,
  deleteTechStack,
  moveTechStack,
  updateTechStack,
  type TechStackActionState,
} from "@/actions/tech-stack";
import {
  useActionState,
  useEffect,
  useState,
} from "react";

type TechStack = {
  id: string;
  name: string;
  category:
    | "FRONTEND"
    | "BACKEND"
    | "DATABASE"
    | "TOOL";
  order: number;
};

type TechStackManagerProps = {
  techStacks: TechStack[];
};

const initialState: TechStackActionState = {};

const TechStackManager = ({
  techStacks,
}: TechStackManagerProps) => {
  // Create
  const [state, formAction, isPending] = useActionState(
    createTechStack,
    initialState,
  );

  // Edit
  const [editingId, setEditingId] = useState<string | null>(
    null,
  );

  const [editState, editFormAction, isEditPending] =
    useActionState(
      updateTechStack,
      initialState,
    );

  // Delete
  const [
    deleteState,
    deleteFormAction,
    isDeletePending,
  ] = useActionState(
    deleteTechStack,
    initialState,
  );

  // Move
  const [
    moveState,
    moveFormAction,
    isMovePending,
  ] = useActionState(
    moveTechStack,
    initialState,
  );

  // Close edit mode after successful update
  useEffect(() => {
    if (editState.success) {
      setEditingId(null);
    }
  }, [editState.success]);

  return (
    <div className="space-y-6">
      {/* Add technology */}
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
          {/* Name */}
          <div>
            <label
              htmlFor="create-name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Technology
            </label>

            <input
              id="create-name"
              name="name"
              required
              placeholder="React"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="create-category"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Category
            </label>

            <select
              id="create-category"
              name="category"
              defaultValue="FRONTEND"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            >
              <option value="FRONTEND">
                Frontend
              </option>

              <option value="BACKEND">
                Backend
              </option>

              <option value="DATABASE">
                Database
              </option>

              <option value="TOOL">
                Tool
              </option>
            </select>
          </div>

          {/* Order */}
          <div>
            <label
              htmlFor="create-order"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Order
            </label>

            <input
              id="create-order"
              name="order"
              type="number"
              min="0"
              defaultValue="0"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>

          {/* Submit */}
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

      {/* Technology list */}
      <section className="portfolio-panel overflow-hidden">
        <div className="border-b border-border px-6 py-5">
          <h2 className="text-lg font-semibold text-foreground">
            Technologies
          </h2>
        </div>

        {/* Move feedback */}
        {moveState.error && (
          <div
            role="alert"
            className="border-b border-border bg-red-50 px-6 py-3 text-sm text-red-600"
          >
            {moveState.error}
          </div>
        )}

        {moveState.success && (
          <div
            role="status"
            className="border-b border-border bg-green-50 px-6 py-3 text-sm text-green-600"
          >
            {moveState.success}
          </div>
        )}

        {techStacks.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-text-muted">
              No technologies have been added yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {techStacks.map((tech) => {
              const isEditing = editingId === tech.id;

              const isFirst =
                techStacks[0]?.id === tech.id;

              const isLast =
                techStacks[techStacks.length - 1]?.id ===
                tech.id;

              return (
                <div
                  key={tech.id}
                  className="px-6 py-5"
                >
                  {isEditing ? (
                    <form
                      action={editFormAction}
                      className="grid gap-4 lg:grid-cols-[1fr_180px_120px_auto_auto]"
                    >
                      {/* ID */}
                      <input
                        type="hidden"
                        name="id"
                        value={tech.id}
                      />

                      {/* Name */}
                      <div>
                        <label
                          htmlFor={`edit-name-${tech.id}`}
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Technology
                        </label>

                        <input
                          id={`edit-name-${tech.id}`}
                          name="name"
                          defaultValue={tech.name}
                          required
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label
                          htmlFor={`edit-category-${tech.id}`}
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Category
                        </label>

                        <select
                          id={`edit-category-${tech.id}`}
                          name="category"
                          defaultValue={tech.category}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                        >
                          <option value="FRONTEND">
                            Frontend
                          </option>

                          <option value="BACKEND">
                            Backend
                          </option>

                          <option value="DATABASE">
                            Database
                          </option>

                          <option value="TOOL">
                            Tool
                          </option>
                        </select>
                      </div>

                      {/* Order */}
                      <div>
                        <label
                          htmlFor={`edit-order-${tech.id}`}
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Order
                        </label>

                        <input
                          id={`edit-order-${tech.id}`}
                          name="order"
                          type="number"
                          min="0"
                          defaultValue={tech.order}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                        />
                      </div>

                      {/* Save */}
                      <div className="flex items-end">
                        <button
                          type="submit"
                          disabled={isEditPending}
                          className="portfolio-button portfolio-button-primary w-full"
                        >
                          {isEditPending
                            ? "Saving..."
                            : "Save"}
                        </button>
                      </div>

                      {/* Cancel */}
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingId(null)
                          }
                          disabled={isEditPending}
                          className="portfolio-button portfolio-button-secondary w-full"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      {/* Technology information */}
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">
                          {tech.name}
                        </p>

                        <p className="mt-1 text-sm text-text-muted">
                          {tech.category}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="mr-2 text-sm text-text-soft">
                          Order {tech.order}
                        </span>

                        {/* Move up */}
                        <form action={moveFormAction}>
                          <input
                            type="hidden"
                            name="id"
                            value={tech.id}
                          />

                          <input
                            type="hidden"
                            name="direction"
                            value="up"
                          />

                          <button
                            type="submit"
                            disabled={
                              isMovePending ||
                              isFirst ||
                              isEditPending ||
                              isDeletePending
                            }
                            aria-label={`Move ${tech.name} up`}
                            title={
                              isFirst
                                ? "Already at the top"
                                : "Move up"
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-muted text-text-muted transition hover:border-border-strong hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                        </form>

                        {/* Move down */}
                        <form action={moveFormAction}>
                          <input
                            type="hidden"
                            name="id"
                            value={tech.id}
                          />

                          <input
                            type="hidden"
                            name="direction"
                            value="down"
                          />

                          <button
                            type="submit"
                            disabled={
                              isMovePending ||
                              isLast ||
                              isEditPending ||
                              isDeletePending
                            }
                            aria-label={`Move ${tech.name} down`}
                            title={
                              isLast
                                ? "Already at the bottom"
                                : "Move down"
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-muted text-text-muted transition hover:border-border-strong hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                        </form>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() =>
                            setEditingId(tech.id)
                          }
                          disabled={
                            isEditPending ||
                            isDeletePending ||
                            isMovePending
                          }
                          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <form
                          action={deleteFormAction}
                          onSubmit={(event) => {
                            const confirmed =
                              window.confirm(
                                `Delete "${tech.name}" from your tech stack?`,
                              );

                            if (!confirmed) {
                              event.preventDefault();
                            }
                          }}
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={tech.id}
                          />

                          <button
                            type="submit"
                            disabled={
                              isDeletePending ||
                              isEditPending ||
                              isMovePending
                            }
                            className="text-sm font-medium text-red-600 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isDeletePending
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Edit feedback */}
                  {isEditing && editState.error && (
                    <p
                      role="alert"
                      className="mt-4 text-sm text-red-600"
                    >
                      {editState.error}
                    </p>
                  )}

                  {isEditing && editState.success && (
                    <p
                      role="status"
                      className="mt-4 text-sm text-green-600"
                    >
                      {editState.success}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Delete feedback */}
      {(deleteState.error || deleteState.success) && (
        <div
          role={deleteState.error ? "alert" : "status"}
          className={
            deleteState.error
              ? "text-sm text-red-600"
              : "text-sm text-green-600"
          }
        >
          {deleteState.error ?? deleteState.success}
        </div>
      )}
    </div>
  );
};

export default TechStackManager;