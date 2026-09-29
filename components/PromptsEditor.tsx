"use client";

import { useState } from "react";
import type { Prompt, PromptType } from "@/types/game";
import { MAX_PROMPTS, MAX_PROMPT_LENGTH } from "@/lib/constants";

type PromptsEditorProps = {
  prompts: Prompt[];
  onAdd: (text: string, type: PromptType) => boolean;
  onRemove: (id: string) => void;
  onReset: () => void;
};

const TABS: { type: PromptType; label: string }[] = [
  { type: "dare", label: "Dares" },
  { type: "drink", label: "Drinks" },
];

export default function PromptsEditor({
  prompts,
  onAdd,
  onRemove,
  onReset,
}: PromptsEditorProps) {
  const [tab, setTab] = useState<PromptType>("dare");
  const [text, setText] = useState("");

  const visible = prompts.filter((prompt) => prompt.type === tab);
  const limitReached = prompts.length >= MAX_PROMPTS;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (onAdd(text, tab)) setText("");
  }

  return (
    <details className="mt-4 rounded-xl bg-slate-900 px-4 py-3">
      <summary className="cursor-pointer select-none">
        Prompts
        <span className="ml-2 text-xs text-slate-500">
          {prompts.length}/{MAX_PROMPTS}
        </span>
      </summary>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {TABS.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => setTab(item.type)}
            aria-pressed={tab === item.type}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              tab === item.type
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            {item.label} (
            {prompts.filter((prompt) => prompt.type === item.type).length})
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Add a ${tab}...`}
          maxLength={MAX_PROMPT_LENGTH}
          disabled={limitReached}
          className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 focus:ring-emerald-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!text.trim() || limitReached}
          className="rounded-lg bg-white px-4 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {visible.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          No {tab} prompts. Add one above.
        </p>
      ) : (
        <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto">
          {visible.map((prompt) => (
            <li
              key={prompt.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-slate-800 px-3 py-2 text-sm"
            >
              <span>{prompt.text}</span>
              <button
                type="button"
                onClick={() => onRemove(prompt.id)}
                aria-label={`Remove prompt: ${prompt.text}`}
                className="text-slate-500 hover:text-white"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-xs text-slate-500 underline hover:text-white"
      >
        Reset to default prompts
      </button>
    </details>
  );
}