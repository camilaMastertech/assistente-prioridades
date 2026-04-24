# Assistente Pessoal de Prioridades

Aplicação Next.js (App Router + TypeScript) para cadastrar tarefas, definir prioridades e destacar o "foco de hoje". Persistência em **Vercel Postgres** via **Prisma**.

## Estrutura

- `app/` — App Router (layout, página inicial, rotas de API, estilos globais)
- `app/api/tasks/` — endpoints REST (`GET`, `POST`, `PATCH`, `DELETE`)
- `components/` — componentes de UI (formulário, lista, foco)
- `lib/` — tipos, cliente HTTP e singleton do Prisma
- `prisma/schema.prisma` — modelo `Task` e enums (Priority, Category)

## Deploy na Vercel (passo a passo)

1. **Suba o código pra um repositório Git** (GitHub/GitLab/Bitbucket).
2. No painel da Vercel: **Add New → Project** → importe o repositório → **Deploy**.
3. Após o primeiro deploy (vai falhar por falta de banco), vá em **Storage → Create Database → Postgres** (Neon).
4. Conecte o banco ao projeto — as variáveis `DATABASE_URL` e `DATABASE_URL_UNPOOLED` são injetadas automaticamente.
5. Clique em **Redeploy**. O script `build` roda `prisma migrate deploy` e cria as tabelas.

### Alternativa via CLI

```bash
npm i -g vercel
vercel login
vercel link            # vincula o diretório ao projeto na Vercel
vercel env pull .env   # baixa as vars de prod pra .env local
npx prisma migrate dev --name init   # cria a migration inicial e aplica
git add prisma/migrations && git commit -m "init schema"
vercel --prod          # deploy
```

## Rodar localmente

Você precisa do `DATABASE_URL` apontando pro Postgres (use o da Vercel via `vercel env pull` ou um Postgres local/Docker).

```bash
npm install
npx prisma migrate dev   # cria/aplica migrations no banco local
npm run dev
```

Acesse `http://localhost:3000`.
