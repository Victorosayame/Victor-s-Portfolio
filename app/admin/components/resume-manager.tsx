"use client";

import { ResumeActionState, saveResume } from "@/actions/resume";
import { useActionState } from "react";
import { startTransition, useState } from "react";
import { upload } from "@vercel/blob/client";

type Resume = {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
} | null;

type ResumeManagerProps = {
  resume: Resume;
};

const initialState: ResumeActionState = {};

const ResumeManagerPage = ({ resume }: ResumeManagerProps) => {
  const [state, formAction, isPending] = useActionState(
    saveResume,
    initialState,
  );

  const [selectedResume, setSelectedResume] = useState<File | null>(null);

  const [uploadingResume, setUploadingResume] = useState(false);

  const [resumeUploadError, setResumeUploadError] = useState<string | null>(
    null,
  );
  return (
    <div className="space-y-6">
      <section className="portfolio-panel p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Resume</h2>

          <p className="mt-1 text-sm text-text-muted">
            Manage the resume displayed on your portfolio.
          </p>
        </div>

        {resume ? (
          <div className="mb-6 rounded-2xl border border-border bg-surface-muted p-5">
            <p className="text-sm font-medium text-foreground">
              Current resume
            </p>

            <p className="mt-1 text-sm text-text-muted">{resume.fileName}</p>

            <p className="mt-2 text-xs text-text-soft">
              Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
            </p>

            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              View resume
            </a>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl border border-border bg-surface-muted p-5">
            <p className="text-sm font-medium text-foreground">
              No resume uploaded
            </p>

            <p className="mt-1 text-sm text-text-muted">
              Add your current resume below.
            </p>
          </div>
        )}

        <form
          // action={formAction}
          onSubmit={async (event) => {
            event.preventDefault();

            setResumeUploadError(null);

            const form = event.currentTarget;
            const formData = new FormData(form);

            try {
              if (!selectedResume) {
                setResumeUploadError("Please select a PDF resume.");
                return;
              }

              if (selectedResume.size > 10 * 1024 * 1024) {
                setResumeUploadError("Resume PDF must be 10MB or smaller.");
                return;
              }

              setUploadingResume(true);

              const blob = await upload(
                `resume/${selectedResume.name}`,
                selectedResume,
                {
                  access: "public",
                  handleUploadUrl: "/api/blob/upload",
                },
              );

              formData.set("fileName", selectedResume.name);

              formData.set("fileUrl", blob.url);

              startTransition(() => {
                formAction(formData);
              });
            } catch (error) {
              console.error("Resume upload failed:", error);

              setResumeUploadError(
                error instanceof Error
                  ? error.message
                  : "Unable to upload resume.",
              );
            } finally {
              setUploadingResume(false);
            }
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="fileName"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              File name
            </label>

            <input
              id="fileName"
              name="fileName"
              required
              defaultValue={resume?.fileName ?? ""}
              placeholder="My_Resume.pdf"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="fileUrl"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Resume PDF
            </label>
            {resume?.fileUrl && (
              <div className="mb-4 rounded-xl border border-border bg-surface-muted p-4">
                <p className="text-sm font-medium text-foreground">
                  Current resume
                </p>

                <p className="mt-1 text-sm text-text-muted">
                  {resume.fileName}
                </p>

                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
                >
                  View current resume
                </a>
              </div>
            )}

            <input
              id="fileUrl"
              name="fileUrl"
              type="file"
              required
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setSelectedResume(file);
                setResumeUploadError(null);
              }}
              placeholder="https://..."
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />

            <p className="mt-2 text-xs text-text-soft">
              PDF only. Maximum: 10MB.
            </p>
            {resumeUploadError && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                {resumeUploadError}
              </p>
            )}
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
              disabled={isPending || uploadingResume}
              className="portfolio-button portfolio-button-primary"
            >
              {uploadingResume
                ? "Uploading resume..."
                : isPending
                  ? "Saving..."
                  : "Save resume"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ResumeManagerPage;
