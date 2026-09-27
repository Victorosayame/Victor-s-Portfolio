"use client";

import { useActionState } from "react";

import { login, type LoginState } from "@/actions/auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(
    login,
    initialState,
  );

  return (
    <main>
      <h1>Admin Login</h1>

      <form action={formAction}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {state.error && (
          <p
            role="alert"
            aria-live="polite"
          >
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}