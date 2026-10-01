import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SellerDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin?callbackUrl=%2Fseller%2Fdashboard");
  }

  if (session.user.role !== "VENDEDOR" && session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-4 py-10 text-[#171916] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black tracking-[0.08em] text-[#d94332]">THEGO</p>
        <h1 className="mt-8 text-3xl font-semibold">Painel de vendedor</h1>
        <p className="mt-2 text-[#686a62]">
          Bem-vindo, {session.user.name ?? session.user.email}.
        </p>
        <p className="mt-8 border-y border-[#e7e7e1] py-6 text-sm text-[#62645d]">
          A tua conta de vendedor está ativa. As ferramentas de gestão da loja serão disponibilizadas aqui.
        </p>
      </div>
    </main>
  );
}