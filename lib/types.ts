export type Priority = "alta" | "media" | "baixa";

export type Category =
  | "trabalho"
  | "estudos"
  | "pessoal"
  | "saude"
  | "outros";

export interface Task {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
  done: boolean;
  createdAt: string;
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  trabalho: "Trabalho",
  estudos: "Estudos",
  pessoal: "Pessoal",
  saude: "Saúde",
  outros: "Outros",
};
