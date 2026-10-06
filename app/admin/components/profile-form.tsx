"use client";

import { startTransition, useActionState, useState } from "react";

import {
  saveProfile,
  type ProfileActionState,
} from "@/actions/profile";
import { upload } from "@vercel/blob/client";

type ProfileFormProps = {
  profile: {
    preferredName: string;
    fullName: string;
    headline: string;
    bio: string;
    location: string;
    photoUrl: string;
    availability: string;
  };
};

const initialState: ProfileActionState = {};

export default function ProfileForm({
  profile,
}: ProfileFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [uploadingPhoto, setUploadingPhoto] = useState(false);
const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
const [uploadError, setUploadError] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(
    saveProfile,
    initialState,
  );

  const isSaving = isPending || isUploadingPhoto;

  return (
    <form
      // action={formAction}
      onSubmit={async (e) => {
        e.preventDefault();

        setUploadError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
          let photoUrl = formData.get("photoUrl");

          if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
              setUploadError("Profile photo must be 5mb or smaller.");
              return;
            }

            setUploadingPhoto(true);

            const blob = await upload(
              `profile/${selectedFile.name}`,
              selectedFile,
              {
                access: "public",
                handleUploadUrl: "/api/blob/upload",
              },
            );

            photoUrl = blob.url;
            formData.set("photoUrl", blob.url);
          }

          startTransition(() => {
            formAction(formData);
          })
        } catch (error) {
          console.error("Profile photo upload failed.", error);

          setUploadError(
            error instanceof Error
            ? error.message
            : "Unable to upload profile photo.",
          );
        } finally {
          setUploadingPhoto(false);
        }
      }}
      className="space-y-6"
    >
      <section className="portfolio-panel p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Personal information
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            The information visitors will see on your portfolio.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="preferredName"
              className="text-sm font-medium text-foreground"
            >
              Preferred name
            </label>

            <input
              id="preferredName"
              name="preferredName"
              defaultValue={profile.preferredName}
              required
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-foreground"
            >
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              defaultValue={profile.fullName}
              required
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <label
            htmlFor="headline"
            className="text-sm font-medium text-foreground"
          >
            Headline
          </label>

          <input
            id="headline"
            name="headline"
            defaultValue={profile.headline}
            required
            placeholder="Powerful headline that describes you"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
          />
        </div>

        <div className="mt-5 space-y-2">
          <label
            htmlFor="bio"
            className="text-sm font-medium text-foreground"
          >
            Bio
          </label>

          <textarea
            id="bio"
            name="bio"
            defaultValue={profile.bio}
            required
            rows={7}
            className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-accent"
          />
        </div>

        <div className="mt-5 space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium text-foreground"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            defaultValue={profile.location}
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
          />
        </div>

        <div className="mt-5 space-y-2">
          <label
            htmlFor="photoUrl"
            className="text-sm font-medium text-foreground"
          >
            Profile photo
          </label>

           {profile?.photoUrl && (
    <div className="mb-4">
      <p className="mb-2 text-sm text-text-muted">
        Current photo
      </p>

      <img
        src={profile.photoUrl}
        alt="Current profile"
        className="h-32 w-32 rounded-2xl object-cover border border-border"
      />
    </div>
  )}

          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;

              setSelectedFile(file);
              setUploadError(null);
            }}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
          />

          <input
    type="hidden"
    name="photoUrl"
    defaultValue={profile?.photoUrl ?? ""}
  />

          <p className="mt-2 text-xs text-text-muted">
    JPEG, PNG, or WebP. Maximum size: 5MB.
  </p>

  {uploadError && (
    <p role="alert" className="mt-2 text-sm text-red-600">
      {uploadError}
    </p>
  )}
        </div>

        <div className="mt-5 space-y-2">
          <label
            htmlFor="availability"
            className="text-sm font-medium text-foreground"
          >
            Availability
          </label>

          <input
            id="availability"
            name="availability"
            defaultValue={profile.availability}
            placeholder="Available for freelance projects"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
          />
        </div>
      </section>

      {state.error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      {state.success && (
        <div
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {state.success}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="portfolio-button portfolio-button-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploadingPhoto
    ? "Uploading photo..."
    : isPending
      ? "Saving..."
      : "Save profile"}
        </button>
      </div>
    </form>
  );
}