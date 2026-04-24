import type { Category, Priority, Task } from "./types";

// Cliente HTTP fino que conversa com /api/tasks.
// Centralizar aqui evita repetir fetch/headers nos componentes.

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks", { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar tarefas");
  return res.json();
}

export async function createTask(input: {
  title: string;
  category: Category;
  priority: Priority;
}): Promise<Task> {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Falha ao criar tarefa");
  return res.json();
}

export async function updateTaskDone(id: string, done: boolean): Promise<Task> {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done }),
  });
  if (!res.ok) throw new Error("Falha ao atualizar tarefa");
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao remover tarefa");
}
