"use client";

import { useEffect, useState } from "react";
import type { Prompt, PromptType } from "@/types/game";
import { MAX_PLAYERS, MIN_PLAYERS } from "@/lib/constants";
import { readPartySettings, savePartySettings } from "@/lib/storage";
import PromptsEditor from "@/components/PromptsEditor";

type PartySetupScreenProps = {
  prompts: Prompt[];
  onAddPrompt: (text: string, type: PromptType) => boolean;
  onRemovePrompt: (id: string) => void;
  onResetPrompts: () => void;
  onStart: (names: string[], noDrinks: boolean) => void;
  onBack: () => void;
};

export default function PartySetupScreen({
  prompts,
  onAddPrompt,
  onRemovePrompt,
  onResetPrompts,
  onStart,
  onBack,
}: PartySetupScreenProps) {
  const [nameInputs, setNameInputs] = useState<string[]>(
    Array(MIN_PLAYERS).fill("")
  );
  const [noDrinks, setNoDrinks] = useState(false);

  useEffect(() => {
    const saved = readPartySettings();
    if (!saved) return;

    const names = saved.names.slice(0, MAX_PLAYERS);
    while (names.length < MIN_PLAYERS) names.push("");

    setNameInputs(names);
    setNoDrinks(saved.noDrinks);
  }, []);

  const validNames = nameInputs.map((n) => n.trim()).filter(Boolean);
  const activeType: PromptType = noDrinks ? "dare" : "drink";
  const hasPrompts = prompts.some((prompt) => prompt.type === activeType);
  const canStart = validNames.length >= MIN_PLAYERS && hasPrompts;

  function updateName(index: number, value: string) {
    setNameInputs((prev) => prev.map((n, i) => (i === index ? value : n)));
  }

  function addPlayer() {
    setNameInputs((prev) =>
      prev.length < MAX_PLAYERS ? [...prev, ""] : prev
    );
  }

  function removePlayer(index: number) {
    setNameInputs((prev) =>
      prev.length > MIN_PLAYERS ? prev.filter((_, i) => i !== index) : prev
    );
  }

  function handleStart() {
    savePartySettings({ names: validNames, noDrinks });
    onStart(validNames, noDrinks);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-white">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-black">Party setup</h1>
        <p className="mt-2 text-center text-sm text-slate-400">
          Add {MIN_PLAYERS} to {MAX_PLAYERS} players.
        </p>

        <div className="mt-6 space-y-3">
          {nameInputs.map((name, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={name}
                onChange={(e) => updateName(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                maxLength={20}
                className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-800 focus:ring-emerald-500"
              />
              {nameInputs.length > MIN_PLAYERS && (
                <button
                  type="button"
                  onClick={() => removePlayer(index)}
                  aria-label={`Remove player ${index + 1}`}
                  className="rounded-xl bg-slate-900 px-4 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {nameInputs.length < MAX_PLAYERS && (
          <button
            type="button"
            onClick={addPlayer}
            className="mt-3 w-full rounded-xl border border-dashed border-slate-700 px-4 py-3 text-slate-400 hover:text-white"
          >
            + Add player
          </button>
        )}

        <label className="mt-6 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3">
          <input
            type="checkbox"
            checked={noDrinks}
            onChange={(e) => setNoDrinks(e.target.checked)}
            className="h-5 w-5"
          />
          <span>
            No drinks
            <span className="block text-xs text-slate-500">
              Only dares and challenges.
            </span>
          </span>
        </label>

        <PromptsEditor
          prompts={prompts}
          onAdd={onAddPrompt}
          onRemove={onRemovePrompt}
          onReset={onResetPrompts}
        />

        {!hasPrompts && (
          <p className="mt-4 text-center text-sm text-amber-300">
            Add at least one {activeType} prompt to start.
          </p>
        )}

        <button
          type="button"
          onClick={handleStart}
          disabled={!canStart}
          className="mt-6 w-full rounded-2xl bg-emerald-500 px-5 py-5 text-lg font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Start game
        </button>
        <button
          type="button"
          onClick={onBack}
          className="mt-3 w-full px-5 py-3 text-slate-400 hover:text-white"
        >
          Back
        </button>
      </div>
    </main>
  );
}