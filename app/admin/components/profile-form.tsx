"use client";

import { useActionState } from "react";

import {
  saveProfile,
  type ProfileActionState,
} from "@/actions/profile";

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
  const [state, formAction, isPending] = useActionState(
    saveProfile,
    initialState,
  );

  return (
    <form
      action={formAction}
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
            Photo URL
          </label>

          <input
            id="photoUrl"
            name="photoUrl"
            type="url"
            defaultValue={profile.photoUrl}
            placeholder="https://..."
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
          />
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
          disabled={isPending}
          className="portfolio-button portfolio-button-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}