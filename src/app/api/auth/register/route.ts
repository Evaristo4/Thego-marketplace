import { hash } from "bcrypt";
import { getPrisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const { name, email, password } = body as Record<string, unknown>;
  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (
    cleanName.length < 2 ||
    cleanName.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
  ) {
    return Response.json(
      { error: "Confirma o nome, o email e uma senha com pelo menos 8 caracteres." },
      { status: 400 },
    );
  }

  try {
    const prisma = getPrisma();
    const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });

    if (existingUser) {
      return Response.json(
        { error: "Já existe uma conta associada a este email." },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 12);

    await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        passwordHash,
        role: "VENDEDOR",
      },
    });
  } catch {
    return Response.json(
      { error: "Registo indisponível. Verifica a ligação à base de dados e tenta novamente." },
      { status: 503 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}