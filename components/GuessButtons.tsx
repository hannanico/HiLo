import type { Guess, Odds } from "@/types/game";

type GuessButtonsProps = {
  odds: Odds | null;
  disabled: boolean;
  onGuess: (guess: Guess) => void;
};

const formatOdds = (value?: number) =>
  value === undefined ? "--" : `${value.toFixed(2)}%`;

export default function GuessButtons({
  odds,
  disabled,
  onGuess,
}: GuessButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onGuess("higher")}
        disabled={disabled}
        className="rounded-2xl bg-emerald-500 px-5 py-4 text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="block text-lg font-bold">↑ Higher</span>
        <span className="mt-1 block text-sm font-medium opacity-75">
          {formatOdds(odds?.higher)}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onGuess("lower")}
        disabled={disabled}
        className="rounded-2xl bg-sky-500 px-5 py-4 text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="block text-lg font-bold">↓ Lower</span>
        <span className="mt-1 block text-sm font-medium opacity-75">
          {formatOdds(odds?.lower)}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onGuess("same")}
        disabled={disabled}
        className="col-span-2 rounded-2xl bg-amber-400 px-5 py-4 text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="block text-lg font-bold">= Same</span>
        <span className="mt-1 block text-sm font-medium opacity-75">
          {formatOdds(odds?.same)}
        </span>
      </button>
    </div>
  );
}