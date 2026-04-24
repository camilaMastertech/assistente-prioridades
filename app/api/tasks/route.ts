import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Category, Priority } from "@/lib/types";

export const dynamic = "force-dynamic";

const CATEGORIES: Category[] = [
  "trabalho",
  "estudos",
  "pessoal",
  "saude",
  "outros",
];
const PRIORITIES: Priority[] = ["alta", "media", "baixa"];

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const category = body.category as Category;
  const priority = body.priority as Priority;

  if (!title) {
    return NextResponse.json({ error: "Título obrigatório" }, { status: 400 });
  }
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Categoria inválida" }, { status: 400 });
  }
  if (!PRIORITIES.includes(priority)) {
    return NextResponse.json({ error: "Prioridade inválida" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: { title, category, priority },
  });
  return NextResponse.json(task, { status: 201 });
}
