-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('alta', 'media', 'baixa');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('trabalho', 'estudos', 'pessoal', 'saude', 'outros');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "priority" "Priority" NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Task_done_priority_createdAt_idx" ON "Task"("done", "priority", "createdAt");
