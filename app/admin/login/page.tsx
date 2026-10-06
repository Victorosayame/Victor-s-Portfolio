"use client";

import Link from "next/link";
import { useState } from "react";
import { useActionState } from "react";

import { login, type LoginState } from "@/actions/auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-[var(--color-text)]"
            >
              Bishop
            </Link>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Portfolio CMS
            </p>
          </div>

          {/* Login card */}
          <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-lg font-bold text-white">
                B
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)]">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                Sign in to manage your portfolio content.
              </p>
            </div>

            <form action={formAction} className="mt-8 space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[rgba(200,167,90,0.12)]"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 pr-12 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[rgba(200,167,90,0.12)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.58 10.59a2 2 0 002.83 2.83"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.88 5.24A10.94 10.94 0 0112 5c5 0 8.5 3.5 9.5 7-.34 1.2-.95 2.34-1.8 3.33"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.7 6.7C4.8 7.92 3.45 9.8 2.5 12c.75 2.75 4.2 7 9.5 7 1.62 0 3.08-.35 4.38-.96"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                        />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {state.error && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {state.error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="flex w-full items-center justify-center rounded-2xl bg-[var(--color-accent)] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[rgba(200,167,90,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-[var(--color-text-soft)]">
            Private portfolio administration
          </p>
        </div>
      </div>
    </main>
  );
}
