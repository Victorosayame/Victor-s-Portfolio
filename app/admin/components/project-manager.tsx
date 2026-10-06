"use client";

import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  createProject,
  deleteProject,
  moveProject,
  setProjectFeatured,
  updateProject,
  type ProjectActionState,
} from "@/actions/project";

import { startTransition, useActionState, useEffect, useState } from "react";

import { upload } from "@vercel/blob/client";

type Project = {
  id: string;
  title: string;
  role: string;
  summary: string;
  outcome: string;
  imageUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  caseStudyUrl: string | null;
  featured: boolean;
  order: number;
};

type ProjectManagerProps = {
  projects: Project[];
};

const initialState: ProjectActionState = {};

const ProjectManagerPage = ({ projects }: ProjectManagerProps) => {
  // Create
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );

  // Edit
  const [editingId, setEditingId] = useState<string | null>(null);

  const [editState, editFormAction, isEditPending] = useActionState(
    updateProject,
    initialState,
  );

  // Delete
  const [deleteState, deleteFormAction, isDeletePending] = useActionState(
    deleteProject,
    initialState,
  );

  // Featured
  const [, featuredFormAction, isFeaturedPending] = useActionState(
    setProjectFeatured,
    initialState,
  );

  // Ordering
  const [, moveFormAction, isMovePending] = useActionState(
    moveProject,
    initialState,
  );

  // Project currently selected for deletion
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  // Close edit mode after successful update
  useEffect(() => {
    if (editState.success) {
      setEditingId(null);
    }
  }, [editState.success]);

  // Close delete modal after successful deletion
  useEffect(() => {
    if (deleteState.success) {
      setDeleteTarget(null);
    }
  }, [deleteState.success]);

  // Close modal with Escape
  useEffect(() => {
    if (!deleteTarget) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDeletePending) {
        setDeleteTarget(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [deleteTarget, isDeletePending]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (!deleteTarget) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [deleteTarget]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  // you have two different forms:Create project Edit project, A single selectedImage state would mean selecting an image in one form could interfere with the other.So for this component, I'd rather keep the image state tied to the form:
  const [createImage, setCreateImage] = useState<File | null>(null);

  const [editImage, setEditImage] = useState<File | null>(null);

  const [uploadingCreateImage, setUploadingCreateImage] = useState(false);

  const [uploadingEditImage, setUploadingEditImage] = useState(false);

  const [createImageError, setCreateImageError] = useState<string | null>(null);

  const [editImageError, setEditImageError] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* =========================================
          CREATE PROJECT
      ========================================= */}
      <section className="portfolio-panel p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Add project</h2>

          <p className="mt-1 text-sm text-text-muted">
            Add a project to your portfolio.
          </p>
        </div>

        <form
          //   action={formAction}
          onSubmit={async (e) => {
            e.preventDefault();

            setCreateImageError(null);

            const form = e.currentTarget;
            const formData = new FormData(form);

            try {
              if (createImage) {
                if (createImage.size > 5 * 1024 * 1024) {
                  setCreateImageError("Project image must be 5MB or smaller.");
                  return;
                }

                setUploadingCreateImage(true);

                const blob = await upload(
                  `projects/${createImage.name}`,
                  createImage,
                  {
                    access: "public",
                    handleUploadUrl: "/api/blob/upload",
                  },
                );

                formData.set("imageUrl", blob.url);
              }

              startTransition(() => {
                formAction(formData);
              });
            } catch (error) {
              console.error("Project image upload failed:", error);

              setCreateImageError(
                error instanceof Error
                  ? error.message
                  : "Unable to upload project image.",
              );
            } finally {
              setUploadingCreateImage(false);
            }
          }}
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                required
                placeholder="CoinPulse"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Role
              </label>

              <input
                id="role"
                name="role"
                required
                placeholder="Frontend Developer"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="summary"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Summary
            </label>

            <textarea
              id="summary"
              name="summary"
              required
              rows={4}
              placeholder="Briefly describe the project."
              className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="outcome"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Outcome(Outcome and Tech Stack)
            </label>

            <textarea
              id="outcome"
              name="outcome"
              required
              rows={4}
              placeholder="What did the project achieve?"
              className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Project Image
              </label>

              <input
                id="imageUrl"
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;

                  setCreateImage(file);
                  setCreateImageError(null);
                }}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
              <input type="hidden" name="imageUrl" value="" />

              <p className="mt-2 text-xs text-text-muted">
                JPEG, PNG, or WebP. Maximum size: 5MB.
              </p>
              {createImageError && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {createImageError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="liveUrl"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Live URL
              </label>

              <input
                id="liveUrl"
                name="liveUrl"
                type="url"
                placeholder="https://..."
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="repoUrl"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Repository URL
              </label>

              <input
                id="repoUrl"
                name="repoUrl"
                type="url"
                placeholder="https://github.com/..."
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="caseStudyUrl"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Case Study URL
              </label>

              <input
                id="caseStudyUrl"
                name="caseStudyUrl"
                type="url"
                placeholder="https://..."
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
            <label className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface-muted px-4">
              <input
                type="checkbox"
                name="featured"
                value="true"
                defaultChecked
                className="h-4 w-4 accent-[var(--color-accent)]"
              />

              <span className="text-sm font-medium text-foreground">
                Featured project
              </span>
            </label>

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
          </div>

          {state.error && (
            <p role="alert" className="text-sm text-red-600">
              {state.error}
            </p>
          )}

          {state.success && (
            <p role="status" className="text-sm text-green-600">
              {state.success}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending || uploadingCreateImage}
              className="portfolio-button portfolio-button-primary"
            >
              {uploadingCreateImage
                ? "Uploading image..."
                : isPending
                  ? "Creating..."
                  : "Create project"}
            </button>
          </div>
        </form>
      </section>

      {/* =========================================
          PROJECT LIST
      ========================================= */}
      <section className="portfolio-panel overflow-hidden">
        <div className="border-b border-border px-6 py-5">
          <h2 className="text-lg font-semibold text-foreground">Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-text-muted">
              No projects have been added yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {projects.map((project) => {
              const isEditing = editingId === project.id;

              const isFirst = projects[0]?.id === project.id;

              const isLast = projects[projects.length - 1]?.id === project.id;

              return (
                <div key={project.id} className="px-6 py-6">
                  {isEditing ? (
                    /* =================================
                       EDIT PROJECT
                    ================================= */
                    <form
                      //   action={editFormAction}
                      onSubmit={async (event) => {
                        event.preventDefault();

                        setEditImageError(null);

                        const form = event.currentTarget;
                        const formData = new FormData(form);

                        try {
                          if (editImage) {
                            if (editImage.size > 5 * 1024 * 1024) {
                              setEditImageError(
                                "Project image must be 5MB or smaller.",
                              );
                              return;
                            }

                            setUploadingEditImage(true);

                            const blob = await upload(
                              `projects/${editImage.name}`,
                              editImage,
                              {
                                access: "public",
                                handleUploadUrl: "/api/blob/upload",
                              },
                            );

                            formData.set("imageUrl", blob.url);
                          }

                          startTransition(() => {
                            editFormAction(formData);
                          });
                        } catch (error) {
                          console.error("Project image upload failed:", error);

                          setEditImageError(
                            error instanceof Error
                              ? error.message
                              : "Unable to upload project image.",
                          );
                        } finally {
                          setUploadingEditImage(false);
                        }
                      }}
                      className="space-y-5"
                    >
                      <input type="hidden" name="id" value={project.id} />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`edit-title-${project.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Title
                          </label>

                          <input
                            id={`edit-title-${project.id}`}
                            name="title"
                            defaultValue={project.title}
                            required
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`edit-role-${project.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Role
                          </label>

                          <input
                            id={`edit-role-${project.id}`}
                            name="role"
                            defaultValue={project.role}
                            required
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`edit-summary-${project.id}`}
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Summary
                        </label>

                        <textarea
                          id={`edit-summary-${project.id}`}
                          name="summary"
                          defaultValue={project.summary}
                          required
                          rows={5}
                          className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-accent"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`edit-outcome-${project.id}`}
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Outcome
                        </label>

                        <textarea
                          id={`edit-outcome-${project.id}`}
                          name="outcome"
                          defaultValue={project.outcome}
                          required
                          rows={5}
                          className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-accent"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`edit-imageUrl-${project.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Project Image
                          </label>

                          {project.imageUrl && (
                            <div className="mb-4">
                              <p className="mb-2 text-xs text-text-muted">
                                Current image
                              </p>

                              <img
                                src={project.imageUrl}
                                alt={`${project.title} project`}
                                className="h-32 w-full rounded-xl object-cover border border-border sm:w-56"
                              />
                            </div>
                          )}

                          <input
                            id={`edit-imageUrl-${project.id}`}
                            name="image"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(event) => {
                              const file = event.target.files?.[0] ?? null;

                              setEditImage(file);
                              setEditImageError(null);
                            }}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          />
                          <input
                            type="hidden"
                            name="imageUrl"
                            value={project.imageUrl ?? ""}
                          />

                          <p className="mt-2 text-xs text-text-muted">
                            Leave empty to keep the current image.
                          </p>
                          {editImageError && (
                            <p
                              role="alert"
                              className="mt-2 text-sm text-red-600"
                            >
                              {editImageError}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor={`edit-liveUrl-${project.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Live URL
                          </label>

                          <input
                            id={`edit-liveUrl-${project.id}`}
                            name="liveUrl"
                            type="url"
                            defaultValue={project.liveUrl ?? ""}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`edit-repoUrl-${project.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Repository URL
                          </label>

                          <input
                            id={`edit-repoUrl-${project.id}`}
                            name="repoUrl"
                            type="url"
                            defaultValue={project.repoUrl ?? ""}
                            placeholder="https://github.com/..."
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`edit-caseStudyUrl-${project.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Case Study URL
                          </label>

                          <input
                            id={`edit-caseStudyUrl-${project.id}`}
                            name="caseStudyUrl"
                            type="url"
                            defaultValue={project.caseStudyUrl ?? ""}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
                        <label className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface-muted px-4">
                          <input
                            type="checkbox"
                            name="featured"
                            value="true"
                            defaultChecked={project.featured}
                            className="h-4 w-4 accent-[var(--color-accent)]"
                          />

                          <span className="text-sm font-medium text-foreground">
                            Featured project
                          </span>
                        </label>

                        <div>
                          <label
                            htmlFor={`edit-order-${project.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Order
                          </label>

                          <input
                            id={`edit-order-${project.id}`}
                            name="order"
                            type="number"
                            min="0"
                            defaultValue={project.order}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          />
                        </div>
                      </div>

                      {editState.error && (
                        <p role="alert" className="text-sm text-red-600">
                          {editState.error}
                        </p>
                      )}

                      {editState.success && (
                        <p role="status" className="text-sm text-green-600">
                          {editState.success}
                        </p>
                      )}

                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          disabled={isEditPending}
                          className="portfolio-button portfolio-button-secondary"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={isEditPending || uploadingEditImage}
                          className="portfolio-button portfolio-button-primary"
                        >
                          {uploadingEditImage
                            ? "Uploading image..."
                            : isEditPending
                              ? "Saving..."
                              : "Save changes"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* =================================
                       NORMAL PROJECT
                    ================================= */
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-semibold text-foreground">
                            {project.title}
                          </h3>
                        </div>

                        <p className="mt-1 text-sm text-text-muted">
                          {project.role}
                        </p>

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-text-muted">
                          {project.summary}
                        </p>
                      </div>

                      {/* Project controls */}
                      <div className="flex shrink-0 flex-wrap items-center gap-3">
                        <span className="text-sm text-text-soft">
                          Order {project.order}
                        </span>

                        {/* Ordering */}
                        <div className="inline-flex items-center rounded-full border border-border bg-surface-muted p-1">
                          <form action={moveFormAction}>
                            <input type="hidden" name="id" value={project.id} />
                            <input type="hidden" name="direction" value="up" />

                            <button
                              type="submit"
                              disabled={
                                isMovePending ||
                                isFirst ||
                                isEditPending ||
                                isDeletePending ||
                                isFeaturedPending
                              }
                              aria-label={`Move ${project.title} up`}
                              title={isFirst ? "Already at the top" : "Move up"}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </button>
                          </form>

                          <form action={moveFormAction}>
                            <input type="hidden" name="id" value={project.id} />
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
                                isDeletePending ||
                                isFeaturedPending
                              }
                              aria-label={`Move ${project.title} down`}
                              title={
                                isLast ? "Already at the bottom" : "Move down"
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </button>
                          </form>
                        </div>

                        {/* Featured */}
                        <form action={featuredFormAction}>
                          <input type="hidden" name="id" value={project.id} />

                          <input
                            type="hidden"
                            name="featured"
                            value={project.featured ? "false" : "true"}
                          />

                          <button
                            type="submit"
                            disabled={
                              isFeaturedPending ||
                              isMovePending ||
                              isEditPending ||
                              isDeletePending
                            }
                            aria-label={
                              project.featured
                                ? `Remove ${project.title} from featured projects`
                                : `Feature ${project.title}`
                            }
                            title={
                              project.featured
                                ? "Remove from featured"
                                : "Mark as featured"
                            }
                            className={[
                              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                              project.featured
                                ? "border-accent bg-[rgb(200_167_90_/_0.12)] text-accent hover:bg-[rgb(200_167_90_/_0.18)]"
                                : "border-border bg-surface-muted text-text-muted hover:border-border-strong hover:text-foreground",
                              isFeaturedPending
                                ? "cursor-not-allowed opacity-60"
                                : "",
                            ].join(" ")}
                          >
                            <Star
                              className={[
                                "h-3.5 w-3.5",
                                project.featured ? "fill-current" : "",
                              ].join(" ")}
                            />

                            {project.featured ? "Featured" : "Feature"}
                          </button>
                        </form>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => setEditingId(project.id)}
                          disabled={
                            isEditPending ||
                            isMovePending ||
                            isFeaturedPending ||
                            isDeletePending
                          }
                          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(project)}
                          disabled={
                            isDeletePending ||
                            isMovePending ||
                            isFeaturedPending
                          }
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================
          DELETE CONFIRMATION MODAL
      ========================================= */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgb(47_58_72_/_0.35)] p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDeletePending) {
              setDeleteTarget(null);
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-project-title"
            aria-describedby="delete-project-description"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_80px_rgb(47_58_72_/_0.18)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>

                <div>
                  <h2
                    id="delete-project-title"
                    className="text-lg font-semibold text-foreground"
                  >
                    Delete project
                  </h2>

                  <p className="mt-1 text-sm text-text-muted">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeletePending}
                aria-label="Close delete dialog"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <p
                id="delete-project-description"
                className="text-sm leading-6 text-text-muted"
              >
                Are you sure you want to delete{" "}
                <span className="font-semibold text-foreground">
                  "{deleteTarget.title}"
                </span>
                ? The project and its stored information will be permanently
                removed.
              </p>

              {deleteState.error && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {deleteState.error}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border bg-surface-muted px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeletePending}
                className="portfolio-button portfolio-button-secondary"
              >
                Cancel
              </button>

              <form action={deleteFormAction}>
                <input type="hidden" name="id" value={deleteTarget.id} />

                <button
                  type="submit"
                  disabled={isDeletePending}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-bold leading-none text-white shadow-[0_10px_24px_rgb(220_38_38_/_0.18)] transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isDeletePending ? (
                    "Deleting..."
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete project
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagerPage;
