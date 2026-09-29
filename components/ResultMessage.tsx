import type { Card, Guess, Mode, Result } from "@/types/game";

type ResultMessageProps = {
  result: Result;
  mode: Mode;
  lastGuess: Guess | null;
  lastPlayer: string | null;
  previousCard: Card | null;
  currentCard: Card | null;
};

export default function ResultMessage({
  result,
  mode,
  lastGuess,
  lastPlayer,
  previousCard,
  currentCard,
}: ResultMessageProps) {
  const matchedRank =
    previousCard !== null &&
    currentCard !== null &&
    previousCard.value === currentCard.value &&
    lastGuess !== "same";

  const who = lastPlayer ?? "You";

  return (
    <div
      className="mt-6 min-h-20 text-center"
      role="status"
      aria-live="polite"
    >
      {result === null ? (
        <p className="text-slate-300">What comes next?</p>
      ) : (
        <>
          <p
            className={`text-xl font-bold ${
              result === "correct" ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {result === "correct"
              ? "Correct!"
              : mode === "party"
                ? "Wrong guess!"
                : "Wrong guess — round over"}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {who} guessed {lastGuess}. Previous card: {previousCard?.rank}
            {previousCard?.suit}.
            {matchedRank && " Matching ranks count as wrong."}
          </p>
        </>
      )}
    </div>
  );
}