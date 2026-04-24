"use client";

import { useEffect, useMemo, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import FocusToday from "@/components/FocusToday";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTaskDone,
} from "@/lib/api";
import type { Category, Priority, Task } from "@/lib/types";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const focusTask = useMemo(() => {
    const pending = tasks.filter((t) => !t.done);
    const order = { alta: 0, media: 1, baixa: 2 } as const;
    return [...pending].sort((a, b) => {
      const byPriority = order[a.priority] - order[b.priority];
      if (byPriority !== 0) return byPriority;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })[0];
  }, [tasks]);

  async function addTask(input: {
    title: string;
    category: Category;
    priority: Priority;
  }) {
    const created = await createTask(input);
    setTasks((prev) => [created, ...prev]);
  }

  async function toggleDone(id: string) {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    const updated = await updateTaskDone(id, !target.done);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function removeTask(id: string) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main>
      <h1>Assistente Pessoal de Prioridades</h1>
      <p className="subtitle">
        Cadastre tarefas, defina prioridades e descubra qual o seu foco de hoje.
      </p>

      <FocusToday task={focusTask} />

      <section className="card">
        <h2>Nova tarefa</h2>
        <TaskForm onCreate={addTask} />
      </section>

      <section className="card">
        <h2>Suas tarefas</h2>
        {loading ? (
          <p className="empty">Carregando…</p>
        ) : error ? (
          <p className="empty">Erro: {error}</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleDone}
            onRemove={removeTask}
          />
        )}
      </section>
    </main>
  );
}
