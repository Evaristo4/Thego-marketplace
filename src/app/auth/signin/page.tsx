import Link from "next/link";
import SignInForm from "./sign-in-form";

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
};

function localCallbackUrl(value: string | string[] | undefined) {
  if (value === "/checkout" || value === "/seller/dashboard") {
    return value;
  }

  return "/";
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;
  const destination = localCallbackUrl(callbackUrl);
  const registerDestination =
    destination === "/" ? "/seller/dashboard" : destination;

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-4 py-10 text-[#171916] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-md">
        <Link className="text-sm font-black tracking-[0.08em] text-[#d94332]" href="/">
          THEGO
        </Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.1em] text-[#d94332]">
          A tua conta
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Entrar na THEGO</h1>
        <p className="mt-2 text-sm text-[#686a62]">
          Inicia sessão para continuar. Para vender, cria uma conta de vendedor.
        </p>

        <SignInForm callbackUrl={destination} />

        <p className="mt-6 text-center text-sm text-[#62645d]">
          Ainda não tens conta?{" "}
          <Link
            className="font-semibold text-[#d94332] hover:underline"
            href={`/auth/register?callbackUrl=${encodeURIComponent(registerDestination)}`}
          >
            Criar conta de vendedor
          </Link>
        </p>
      </div>
    </main>
  );
}