"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "./actions";

const initial: ActionState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="mt-8 grid gap-4">
      <label className="grid gap-2 text-sm font-bold text-white">
        Kata sandi admin
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="min-h-12 rounded-lg border border-white/15 bg-brand-night px-4 text-base font-normal text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40"
        />
      </label>
      {state.error ? (
        <p role="alert" className="text-sm font-semibold text-red-300">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 rounded-full bg-brand-cyan px-6 text-sm font-black text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark disabled:opacity-60"
      >
        {pending ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
