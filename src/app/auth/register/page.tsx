import Link from "next/link";
import RegisterForm from "./register-form";

type RegisterPageProps = {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
};

function localCallbackUrl(value: string | string[] | undefined) {
  if (value === "/checkout" || value === "/seller/dashboard") {
    return value;
  }

  return "/seller/dashboard";
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { callbackUrl } = await searchParams;
  const destination = localCallbackUrl(callbackUrl);

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-4 py-10 text-[#171916] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-md">
        <Link className="text-sm font-black tracking-[0.08em] text-[#d94332]" href="/">
          THEGO
        </Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.1em] text-[#d94332]">
          Vende na THEGO
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Criar conta de vendedor</h1>
        <p className="mt-2 text-sm text-[#686a62]">
          Cria a tua conta e entra diretamente no painel de vendedor.
        </p>

        <RegisterForm callbackUrl={destination} />

        <p className="mt-6 text-center text-sm text-[#62645d]">
          Já tens conta?{" "}
          <Link
            className="font-semibold text-[#d94332] hover:underline"
            href={`/auth/signin?callbackUrl=${encodeURIComponent(destination)}`}
          >
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}