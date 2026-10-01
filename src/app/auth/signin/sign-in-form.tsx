"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        callbackUrl,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Email ou senha inválidos. Verifica também se a base de dados está configurada.");
        return;
      }

      window.location.assign(result.url ?? callbackUrl);
    } catch {
      setError("O serviço de autenticação está indisponível. Tenta novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="h-12 w-full rounded-md border border-[#d8d9d2] bg-white px-3 text-sm outline-none focus:border-[#d94332]"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="password">
          Senha
        </label>
        <input
          autoComplete="current-password"
          className="h-12 w-full rounded-md border border-[#d8d9d2] bg-white px-3 text-sm outline-none focus:border-[#d94332]"
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      {error && (
        <p aria-live="polite" className="text-sm text-[#bd3528]">
          {error}
        </p>
      )}
      <button
        className="flex min-h-12 w-full items-center justify-center rounded-md bg-[#171916] px-5 text-sm font-bold text-white transition-colors hover:bg-[#343731] disabled:cursor-wait disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "A entrar..." : "Entrar"}
      </button>
    </form>
  );
}