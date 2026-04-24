"use client";

import { CATEGORY_LABEL, PRIORITY_LABEL, type Task } from "@/lib/types";

interface Props {
  task: Task | undefined;
}

export default function FocusToday({ task }: Props) {
  return (
    <section className="card focus-card">
      <h2>Foco de hoje</h2>
      {task ? (
        <>
          <p className="focus-text">{task.title}</p>
          <div className="task-meta" style={{ marginTop: "0.6rem" }}>
            <span className="tag">{CATEGORY_LABEL[task.category]}</span>
            <span className={`tag priority-${task.priority}`}>
              Prioridade {PRIORITY_LABEL[task.priority]}
            </span>
          </div>
        </>
      ) : (
        <p className="focus-text">
          Tudo em dia! Cadastre uma nova tarefa para definir seu próximo foco.
        </p>
      )}
    </section>
  );
}
