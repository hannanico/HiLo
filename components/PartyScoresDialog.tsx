"use client";

import { useRef } from "react";
import PartyScoreboard from "@/components/PartyScoreboard";

type PartyScoresDialogProps = {
  players: string[];
  penaltyCounts: number[];
  currentPlayer: number;
};

export default function PartyScoresDialog({
  players,
  penaltyCounts,
  currentPlayer,
}: PartyScoresDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openScores() {
    dialogRef.current?.showModal();
  }

  function closeScores() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={openScores}
        className="min-h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
      >
        Scores
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Party scores"
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-slate-700 bg-slate-950 p-4 text-white shadow-2xl backdrop:bg-black/70"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Party scores</h2>

          <button
            type="button"
            onClick={closeScores}
            aria-label="Close scores"
            autoFocus
            className="min-h-11 min-w-11 rounded-xl bg-slate-800 text-xl text-slate-200 transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            ×
          </button>
        </div>

        <PartyScoreboard
          players={players}
          penaltyCounts={penaltyCounts}
          currentPlayer={currentPlayer}
        />
      </dialog>
    </>
  );
}