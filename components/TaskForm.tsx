"use client";

import { useState } from "react";
import {
  CATEGORY_LABEL,
  PRIORITY_LABEL,
  type Category,
  type Priority,
} from "@/lib/types";

interface Props {
  onCreate: (input: {
    title: string;
    category: Category;
    priority: Priority;
  }) => Promise<void> | void;
}

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("trabalho");
  const [priority, setPriority] = useState<Priority>("media");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || submitting) return;

    try {
      setSubmitting(true);
      await onCreate({ title: trimmed, category, priority });
      setTitle("");
      setPriority("media");
      setCategory("trabalho");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          placeholder="Ex.: Revisar relatório semanal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="row">
        <div>
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority">Prioridade</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {Object.entries(PRIORITY_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Salvando…" : "Adicionar tarefa"}
      </button>
    </form>
  );
}
