"use client";

import {
  getCartSnapshot,
  getCartTotal,
  getEmptyCartSnapshot,
  subscribeToCart,
} from "@/lib/cart";
import Link from "next/link";
import { useSyncExternalStore } from "react";

function formatKz(amount: number) {
  return `${new Intl.NumberFormat("pt-AO").format(amount)} Kz`;
}

export default function CheckoutPage() {
  const cart = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getEmptyCartSnapshot,
  );
  const subtotal = getCartTotal(cart);

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-4 py-10 text-[#171916] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link className="text-sm font-black tracking-[0.08em] text-[#d94332]" href="/">
          THEGO
        </Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.1em] text-[#d94332]">
          Checkout
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Resumo da encomenda</h1>

        {cart.length === 0 ? (
          <div className="mt-8 border-y border-[#e7e7e1] py-10">
            <p className="text-[#62645d]">A tua sacola está vazia.</p>
            <Link
              className="mt-5 inline-flex min-h-11 items-center rounded-md bg-[#171916] px-5 text-sm font-semibold text-white"
              href="/#destaques"
            >
              Explorar produtos
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-[#e7e7e1] border-y border-[#e7e7e1]">
              {cart.map((item) => (
                <li className="flex items-center gap-4 py-4" key={item.id}>
                  <div
                    aria-hidden="true"
                    className="size-16 shrink-0 rounded-sm bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold">{item.name}</h2>
                    <p className="mt-1 text-xs text-[#777970]">
                      {item.seller} · Quantidade: {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">
                    {formatKz(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-sm text-[#62645d]">Subtotal dos produtos</span>
              <span className="text-xl font-bold">{formatKz(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-[#777970]">
              O custo de entrega será calculado após indicar a província e o peso da encomenda.
            </p>
            <Link
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#d94332] px-5 text-sm font-bold text-white transition-colors hover:bg-[#bd3528]"
              href="/auth/signin?callbackUrl=%2Fcheckout"
            >
              Continuar para os dados de entrega
            </Link>
            <Link
              className="mt-4 block text-center text-sm font-semibold text-[#62645d] hover:text-[#d94332]"
              href="/#destaques"
            >
              Voltar à loja
            </Link>
          </>
        )}
      </div>
    </main>
  );
}