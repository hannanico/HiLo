"use client";

import { useEffect, useState } from "react";
import type { Prompt, PromptType } from "@/types/game";
import { MAX_PROMPTS, MAX_PROMPT_LENGTH } from "@/lib/constants";
import { getDefaultPrompts } from "@/lib/prompts";
import { readPrompts, savePrompts } from "@/lib/storage";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>(getDefaultPrompts);

  useEffect(() => {
    const saved = readPrompts();
    if (saved) setPrompts(saved);
  }, []);

  function update(next: Prompt[]) {
    setPrompts(next);
    savePrompts(next);
  }

  function addPrompt(text: string, type: PromptType): boolean {
    const trimmed = text.trim().slice(0, MAX_PROMPT_LENGTH);

    if (!trimmed || prompts.length >= MAX_PROMPTS) return false;

    update([
      ...prompts,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: trimmed,
        type,
      },
    ]);

    return true;
  }

  function removePrompt(id: string) {
    update(prompts.filter((prompt) => prompt.id !== id));
  }

  function resetPrompts() {
    update(getDefaultPrompts());
  }

  return { prompts, addPrompt, removePrompt, resetPrompts };
}