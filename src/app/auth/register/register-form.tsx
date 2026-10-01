"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function RegisterForm({ callbackUrl }: { callbackUrl: string }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "Não foi possível criar a conta.");
        return;
      }

      const signInResult = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        callbackUrl,
        redirect: false,
      });

      if (!signInResult || signInResult.error) {
        setError("Conta criada. Entra com o email e a senha que escolheste.");
        return;
      }

      window.location.assign(signInResult.url ?? callbackUrl);
    } catch {
      setError("O serviço de registo está indisponível. Verifica a configuração da base de dados.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="name">
          Nome da loja ou vendedor
        </label>
        <input
          autoComplete="name"
          className="h-12 w-full rounded-md border border-[#d8d9d2] bg-white px-3 text-sm outline-none focus:border-[#d94332]"
          id="name"
          maxLength={100}
          name="name"
          required
        />
      </div>
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
          Senha (mínimo 8 caracteres)
        </label>
        <input
          autoComplete="new-password"
          className="h-12 w-full rounded-md border border-[#d8d9d2] bg-white px-3 text-sm outline-none focus:border-[#d94332]"
          id="password"
          minLength={8}
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
        {isSubmitting ? "A criar conta..." : "Criar conta e continuar"}
      </button>
    </form>
  );
}