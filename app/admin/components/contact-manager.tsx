"use client"

import { ContactActionState, createContact, deleteContact, updateContact } from "@/actions/contact";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

type ContactType =
  | "EMAIL"
  | "GITHUB"
  | "LINKEDIN"
  | "X"
  | "OTHER"; 

type Contact = {
    id: string;
    label: string;
    href: string;
    type: ContactType;
    createdAt: Date;
    updatedAt: Date;
}

type ContactManagerProps = {
    contacts: Contact[];
}

const initialState: ContactActionState = {}

const contactTypes: {
    value: ContactType;
    label: string;
}[] = [
    {
        value: "EMAIL",
        label: "Email"
    },
  {
    value: "GITHUB",
    label: "GitHub",
  },
  {
    value: "LINKEDIN",
    label: "LinkedIn",
  },
  {
    value: "X",
    label: "X",
  },
  {
    value: "OTHER",
    label: "Other",
  },
]
const ContactManager = ({ contacts }: ContactManagerProps) => {
    const [createState, createFormAction, isCreatePending] = useActionState(
        createContact, initialState,
    )

     // Edit
  const [editingId, setEditingId] =
    useState<string | null>(null);

    const [editState, editFormAction, isEditPending] = useActionState(updateContact, initialState);

    const [deleteState, deleteFormAction, isDeletePending] = useActionState(deleteContact, initialState);

    const [deleteTarget, setDeleteTarget] =
    useState<Contact | null>(null);


  useEffect(() => {
    if (editState.success) {
      setEditingId(null);
    }
  }, [editState.success]);

  useEffect(() => {
    if (deleteState.success) {
      setDeleteTarget(null);
    }
  }, [deleteState.success]);

  useEffect(() => {
    if (!deleteTarget) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape" &&
        !isDeletePending
      ) {
        setDeleteTarget(null);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [deleteTarget, isDeletePending]);

  useEffect(() => {
    if (!deleteTarget) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [deleteTarget]);
  return (
    <div className="space-y-6">
      {/* CREATE */}
      <section className="portfolio-panel p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Add contact
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            Add a contact method to your portfolio.
          </p>
        </div>

        <form
          action={createFormAction}
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="label"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Label
              </label>

              <input
                id="label"
                name="label"
                required
                placeholder="Email"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Type
              </label>

              <select
                id="type"
                name="type"
                defaultValue=""
                required
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              >
                <option value="" disabled>
                  Select type
                </option>

                {contactTypes.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="href"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              URL
            </label>

            <input
              id="href"
              name="href"
              required
              type="text"
              placeholder="Email or profile link"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>

          {createState.error && (
            <p
              role="alert"
              className="text-sm text-red-600"
            >
              {createState.error}
            </p>
          )}

          {createState.success && (
            <p
              role="status"
              className="text-sm text-green-600"
            >
              {createState.success}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isCreatePending}
              className="portfolio-button portfolio-button-primary"
            >
              {isCreatePending
                ? "Creating..."
                : "Create contact"}
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section className="portfolio-panel overflow-hidden">
        <div className="border-b border-border px-6 py-5">
          <h2 className="text-lg font-semibold text-foreground">
            Contacts
          </h2>
        </div>

        {contacts.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-text-muted">
              No contacts have been added yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {contacts.map((contact) => {
              const isEditing =
                editingId === contact.id;

              return (
                <div
                  key={contact.id}
                  className="px-6 py-6"
                >
                  {isEditing ? (
                    <form
                      action={editFormAction}
                      className="space-y-5"
                    >
                      <input
                        type="hidden"
                        name="id"
                        value={contact.id}
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`edit-label-${contact.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Label
                          </label>

                          <input
                            id={`edit-label-${contact.id}`}
                            name="label"
                            defaultValue={contact.label}
                            required
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`edit-type-${contact.id}`}
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Type
                          </label>

                          <select
                            id={`edit-type-${contact.id}`}
                            name="type"
                            defaultValue={contact.type}
                            required
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                          >
                            {contactTypes.map(
                              (type) => (
                                <option
                                  key={
                                    type.value
                                  }
                                  value={
                                    type.value
                                  }
                                >
                                  {type.label}
                                </option>
                              ),
                            )}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`edit-href-${contact.id}`}
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          URL
                        </label>

                        <input
                          id={`edit-href-${contact.id}`}
                          name="href"
                          type="text"
                          defaultValue={contact.href}
                          required
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                        />
                      </div>

                      {editState.error && (
                        <p
                          role="alert"
                          className="text-sm text-red-600"
                        >
                          {editState.error}
                        </p>
                      )}

                      {editState.success && (
                        <p
                          role="status"
                          className="text-sm text-green-600"
                        >
                          {editState.success}
                        </p>
                      )}

                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingId(null)
                          }
                          disabled={isEditPending}
                          className="portfolio-button portfolio-button-secondary"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={isEditPending}
                          className="portfolio-button portfolio-button-primary"
                        >
                          {isEditPending
                            ? "Saving..."
                            : "Save changes"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="font-medium text-foreground">
                            {contact.label}
                          </p>

                          <span className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-text-muted">
                            {contact.type}
                          </span>
                        </div>

                        <a
                          href={contact.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 block truncate text-sm text-text-muted transition-colors hover:text-foreground"
                        >
                          {contact.href}
                        </a>
                      </div>

                      <div className="flex shrink-0 items-center gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingId(
                              contact.id,
                            )
                          }
                          disabled={
                            isEditPending ||
                            isDeletePending
                          }
                          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget(
                              contact,
                            )
                          }
                          disabled={
                            isDeletePending ||
                            isEditPending
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

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgb(47_58_72_/_0.35)] p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
                event.currentTarget &&
              !isDeletePending
            ) {
              setDeleteTarget(null);
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-contact-title"
            aria-describedby="delete-contact-description"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_80px_rgb(47_58_72_/_0.18)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>

                <div>
                  <h2
                    id="delete-contact-title"
                    className="text-lg font-semibold text-foreground"
                  >
                    Delete contact
                  </h2>

                  <p className="mt-1 text-sm text-text-muted">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                disabled={isDeletePending}
                aria-label="Close delete dialog"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <p
                id="delete-contact-description"
                className="text-sm leading-6 text-text-muted"
              >
                Are you sure you want to delete{" "}
                <span className="font-semibold text-foreground">
                  "{deleteTarget.label}"
                </span>
                ?
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
                onClick={() =>
                  setDeleteTarget(null)
                }
                disabled={isDeletePending}
                className="portfolio-button portfolio-button-secondary"
              >
                Cancel
              </button>

              <form action={deleteFormAction}>
                <input
                  type="hidden"
                  name="id"
                  value={deleteTarget.id}
                />

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
                      Delete contact
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactManager