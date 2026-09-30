"use client";

import { useState } from "react";
import {
  calculateFreight,
  FREIGHT_BASE_PRICES_KZ,
  type AngolaProvince,
} from "@/lib/freight";

const categories = ["Todos", "Tecnologia", "Moda", "Casa", "Beleza"] as const;
type Category = (typeof categories)[number];

const products = [
  {
    name: "Auriculares sem fios",
    seller: "Kiala Tech · Luanda",
    category: "Tecnologia",
    price: 18500,
    previousPrice: 22000,
    badge: "-16%",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center 54%",
    color: "bg-[#e9e5db]",
  },
  {
    name: "Ténis Street Run",
    seller: "Benguela Store · Benguela",
    category: "Moda",
    price: 32000,
    previousPrice: null,
    badge: "Mais vendido",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center",
    color: "bg-[#f1e2dc]",
  },
  {
    name: "Relógio Classic",
    seller: "Tempo & Estilo · Huíla",
    category: "Moda",
    price: 24500,
    previousPrice: null,
    badge: "Novo",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center",
    color: "bg-[#e2e9e6]",
  },
  {
    name: "Mala Urbana",
    seller: "Raiz Concept · Luanda",
    category: "Casa",
    price: 28000,
    previousPrice: null,
    badge: "Feito em Angola",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center",
    color: "bg-[#ede4d7]",
  },
  {
    name: "Cuidados naturais",
    seller: "Muntu Natural · Benguela",
    category: "Beleza",
    price: 12500,
    previousPrice: null,
    badge: "Natural",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center",
    color: "bg-[#e9e9df]",
  },
  {
    name: "Coluna portátil Mini",
    seller: "Kiala Tech · Luanda",
    category: "Tecnologia",
    price: 22000,
    previousPrice: 26000,
    badge: "-15%",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center",
    color: "bg-[#e4e3dc]",
  },
] as const;

function formatKz(amount: number) {
  return `${new Intl.NumberFormat("pt-AO").format(amount)} Kz`;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [province, setProvince] = useState<AngolaProvince>("Luanda");
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "Todos" || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.seller}`
      .toLocaleLowerCase("pt-AO")
      .includes(search.toLocaleLowerCase("pt-AO"));

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#f8f8f5] text-[#171916]">
      <div className="bg-[#161916] px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        Entregas para todo o país <span className="mx-2 text-[#e8bf48]">/</span>
        Compra local, recebe onde estiveres
      </div>

      <header className="relative z-20 border-b border-black/8 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 sm:px-8 lg:flex-nowrap lg:px-12">
          <a href="#inicio" className="flex shrink-0 items-center gap-2.5" aria-label="THEGO, página inicial">
            <span className="grid size-10 place-items-center rounded-md bg-[#d94332] text-lg font-black text-white">
              T
            </span>
            <span>
              <span className="block text-xl font-black leading-none tracking-[0.08em]">
                THEGO
              </span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#74766f]">
                Marketplace Angola
              </span>
            </span>
          </a>

          <form
            className="order-3 flex h-11 w-full overflow-hidden rounded-md border border-[#dedfd9] bg-[#f8f8f5] focus-within:border-[#d94332] lg:order-none lg:mx-auto lg:max-w-[520px]"
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <label className="sr-only" htmlFor="market-search">
              Pesquisar produtos e lojas
            </label>
            <input
              id="market-search"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-[#898b84]"
              placeholder="O que procuras hoje?"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button
              className="bg-[#d94332] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#bd3528]"
              type="submit"
            >
              Pesquisar
            </button>
          </form>

          <div className="relative ml-auto flex shrink-0 items-center gap-4">
            <a
              className="hidden text-sm font-semibold text-[#343731] transition-colors hover:text-[#d94332] sm:inline"
              href="#destaques"
            >
              Entrar
            </a>
            <button
              aria-expanded={cartOpen}
              aria-label={`Abrir sacola, ${cartCount} artigos`}
              className="flex h-10 items-center gap-2 rounded-md border border-[#dedfd9] px-3 text-sm font-semibold transition-colors hover:border-[#171916]"
              onClick={() => setCartOpen((isOpen) => !isOpen)}
              type="button"
            >
              Sacola <span className="text-[#d94332]">{cartCount}</span>
            </button>
            {cartOpen && (
              <div className="absolute right-0 top-12 z-30 w-64 rounded-md border border-[#dedfd9] bg-white p-4 shadow-xl">
                <p className="font-semibold">A tua sacola</p>
                <p className="mt-1 text-sm text-[#74766f]" aria-live="polite">
                  {cartCount === 0
                    ? "Ainda não adicionaste produtos."
                    : `${cartCount} ${cartCount === 1 ? "artigo" : "artigos"} na sacola.`}
                </p>
                <a
                  className="mt-4 block border-t border-[#ecece7] pt-3 text-sm font-semibold text-[#d94332]"
                  href="#destaques"
                  onClick={() => setCartOpen(false)}
                >
                  Continuar a comprar
                </a>
              </div>
            )}
          </div>
        </div>
        <nav
          aria-label="Navegação principal"
          className="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto px-4 pb-3 text-sm font-medium text-[#62645d] sm:px-8 lg:px-12"
        >
          <a className="whitespace-nowrap text-[#d94332]" href="#destaques">
            Loja
          </a>
          <a className="whitespace-nowrap transition-colors hover:text-[#d94332]" href="#categorias">
            Categorias
          </a>
          <a className="whitespace-nowrap transition-colors hover:text-[#d94332]" href="#frete">
            Entregas
          </a>
          <a className="whitespace-nowrap transition-colors hover:text-[#d94332]" href="#vendedores">
            Vende na THEGO
          </a>
        </nav>
      </header>

      <section
        id="inicio"
        className="relative isolate min-h-[390px] overflow-hidden bg-[#20231e] text-white sm:min-h-[440px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(18,22,18,.94) 0%, rgba(18,22,18,.82) 46%, rgba(18,22,18,.2) 100%), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=90')",
          backgroundPosition: "center, center 55%",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto flex min-h-[390px] max-w-[1440px] items-center px-5 py-14 sm:min-h-[440px] sm:px-10 lg:px-16">
          <div className="max-w-[620px]">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#f0c85b]">
              <span className="h-0.5 w-7 bg-[#f0c85b]" />
              O mercado é nosso
            </p>
            <h1 className="max-w-[590px] text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              Descobre o melhor de Angola.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/78 sm:text-lg">
              Produtos únicos, lojas locais e tudo o que procuras, num só lugar.
            </p>
            <a
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-[#e8bf48] px-6 text-sm font-bold text-[#171916] transition-colors hover:bg-[#f4d36e]"
              href="#destaques"
            >
              Explorar produtos
            </a>
          </div>
          <div className="absolute bottom-5 right-5 hidden items-center gap-2 rounded-md border border-white/25 bg-black/25 px-3 py-2 text-xs font-medium backdrop-blur-sm sm:flex lg:right-12">
            <span className="size-2 rounded-full bg-[#e8bf48]" />
            Feito para Angola
          </div>
        </div>
      </section>

      <section id="categorias" className="border-b border-black/6 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-8 lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#85877f]">
              Explora por categoria
            </p>
            <h2 className="mt-1 text-lg font-semibold">Encontra o que precisas</h2>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrar por categoria">
            {categories.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={`whitespace-nowrap rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === category
                    ? "border-[#171916] bg-[#171916] text-white"
                    : "border-[#dedfd9] bg-white text-[#555750] hover:border-[#171916]"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="destaques" className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#d94332]">
              Escolhas THEGO
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Em destaque</h2>
          </div>
          <p className="text-sm text-[#777970]">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto" : "produtos"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6">
            {filteredProducts.map((product) => (
              <article
                className="group min-w-0 overflow-hidden rounded-md border border-[#e7e7e1] bg-white transition-shadow hover:shadow-lg"
                key={product.name}
              >
                <div
                  aria-label={product.name}
                  className={`relative aspect-[4/4.5] overflow-hidden ${product.color}`}
                  role="img"
                  style={{
                    backgroundImage: `url('${product.image}')`,
                    backgroundPosition: product.imagePosition,
                    backgroundSize: "cover",
                  }}
                >
                  <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] rounded-sm bg-white/95 px-2 py-1 text-[10px] font-bold text-[#343731] sm:text-xs">
                    {product.badge}
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="truncate text-sm font-semibold sm:text-base">{product.name}</h3>
                  <p className="mt-1 truncate text-xs text-[#777970]">{product.seller}</p>
                  <div className="mt-3 flex min-h-10 flex-wrap items-end justify-between gap-x-2 gap-y-1">
                    <div>
                      <p className="text-sm font-bold sm:text-base">{formatKz(product.price)}</p>
                      {product.previousPrice && (
                        <p className="text-xs text-[#92948d] line-through">
                          {formatKz(product.previousPrice)}
                        </p>
                      )}
                    </div>
                    <button
                      aria-label={`Adicionar ${product.name} à sacola`}
                      className="rounded-md border border-[#dedfd9] px-2.5 py-1.5 text-xs font-semibold transition-colors hover:border-[#d94332] hover:text-[#d94332]"
                      onClick={() => setCartCount((count) => count + 1)}
                      type="button"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="border-y border-[#e7e7e1] py-10 text-sm text-[#777970]">
            Não encontrámos produtos para essa pesquisa. Experimenta outro termo.
          </p>
        )}
      </section>

      <section id="frete" className="border-y border-[#e6e3d7] bg-[#f0efe7]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-8 sm:py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#d94332]">
              Entregamos em Angola
            </p>
            <h2 className="mt-2 max-w-xl text-2xl font-semibold leading-tight sm:text-3xl">
              O teu próximo achado chega até ti.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#686a62] sm:text-base">
              Escolhe a província e consulta o valor-base estimado da entrega.
            </p>
          </div>
          <div className="grid gap-4 rounded-md border border-[#dedccf] bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-6">
            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="province">
                Província de entrega
              </label>
              <select
                className="h-12 w-full rounded-md border border-[#d8d9d2] bg-white px-3 text-sm outline-none focus:border-[#d94332]"
                id="province"
                onChange={(event) => setProvince(event.target.value as AngolaProvince)}
                value={province}
              >
                {Object.keys(FREIGHT_BASE_PRICES_KZ).map((provinceName) => (
                  <option key={provinceName} value={provinceName}>
                    {provinceName}
                  </option>
                ))}
              </select>
            </div>
            <div aria-live="polite" className="min-w-36 border-l-2 border-[#e8bf48] pl-4">
              <p className="text-xs font-medium text-[#777970]">Frete estimado</p>
              <p className="mt-1 text-xl font-bold">{formatKz(calculateFreight(province))}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="vendedores" className="bg-[#171916] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="text-lg font-semibold">Tens uma loja?</p>
            <p className="mt-1 text-sm text-white/65">
              Leva os teus produtos a clientes de todo o país.
            </p>
          </div>
          <a
            className="inline-flex min-h-11 items-center justify-center self-start rounded-md bg-[#e8bf48] px-5 text-sm font-bold text-[#171916] transition-colors hover:bg-[#f4d36e] sm:self-auto"
            href="mailto:parcerias@thego.ao"
          >
            Vender na THEGO
          </a>
        </div>
      </section>

      <footer className="bg-white px-4 py-6 text-xs text-[#777970] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3">
          <span className="font-bold tracking-[0.08em] text-[#171916]">THEGO</span>
          <span>Marketplace angolano · Preços em kwanzas (Kz)</span>
          <span>© {new Date().getFullYear()} THEGO</span>
        </div>
      </footer>
    </main>
  );
}
