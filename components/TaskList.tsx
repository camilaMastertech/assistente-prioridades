"use client";

import { CATEGORY_LABEL, PRIORITY_LABEL, type Task } from "@/lib/types";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onRemove }: Props) {
  if (tasks.length === 0) {
    return <p className="empty">Nenhuma tarefa cadastrada ainda.</p>;
  }

  return (
    <ul style={{ listStyle: "none" }}>
      {tasks.map((task) => (
        <li key={task.id} className={`task ${task.done ? "done" : ""}`}>
          <div className="task-info">
            <span className="task-title">{task.title}</span>
            <div className="task-meta">
              <span className="tag">{CATEGORY_LABEL[task.category]}</span>
              <span className={`tag priority-${task.priority}`}>
                {PRIORITY_LABEL[task.priority]}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onToggle(task.id)}
            >
              {task.done ? "Reabrir" : "Concluir"}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => onRemove(task.id)}
              aria-label="Remover tarefa"
            >
              Remover
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
