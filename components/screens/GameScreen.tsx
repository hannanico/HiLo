import type { HiLoGame } from "@/hooks/useHiLoGame";
import GuessButtons from "@/components/GuessButtons";
import PartyScoresDialog from "@/components/PartyScoresDialog";
import PenaltyCard from "@/components/PenaltyCard";
import PlayingCard from "@/components/PlayingCard";
import ResultMessage from "@/components/ResultMessage";
import StatsBar from "@/components/StatsBar";

type GameScreenProps = {
  game: HiLoGame;
};

export default function GameScreen({ game }: GameScreenProps) {
  const {
    mode,
    players,
    penaltyCounts,
    currentPlayer,
    lastPlayer,
    penalty,
    currentCard,
    previousCard,
    streak,
    bestStreak,
    result,
    lastGuess,
    roundOver,
    odds,
    makeGuess,
    continueAfterPenalty,
    resetRound,
    backToMenu,
  } = game;

  const isParty = mode === "party";

  return (
    <main className="hilo-game min-h-dvh bg-slate-950 px-4 py-5 text-white">
      <div className="mx-auto w-full max-w-md">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="justify-self-start">
            {isParty && (
              <PartyScoresDialog
                players={players}
                penaltyCounts={penaltyCounts}
                currentPlayer={currentPlayer}
              />
            )}
          </div>

          <h1 className="text-3xl font-black tracking-tight">HiLo</h1>

          <button
            type="button"
            onClick={backToMenu}
            className="min-h-11 justify-self-end rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            Menu
          </button>
        </header>

        {isParty && (
          <p className="hilo-player mt-5 text-center text-lg font-semibold text-amber-300">
            {roundOver
              ? `${players[currentPlayer]} lost this one`
              : `${players[currentPlayer]}'s turn`}
          </p>
        )}

        <div className="hilo-stats mt-5">
          <StatsBar
            streak={streak}
            streakLabel={isParty ? "Group streak" : "Streak"}
            bestStreak={isParty ? undefined : bestStreak}
          />
        </div>

        <div className="hilo-card-area flex min-h-64 items-center justify-center">
          {currentCard ? (
            <PlayingCard card={currentCard} />
          ) : (
            <div className="flex h-52 w-36 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-400">
              Loading...
            </div>
          )}
        </div>

        {result !== null && (
          <ResultMessage
            result={result}
            mode={mode}
            lastGuess={lastGuess}
            lastPlayer={lastPlayer}
            previousCard={previousCard}
            currentCard={currentCard}
          />
        )}

        {roundOver && isParty && penalty && (
          <div className="mt-5">
            <PenaltyCard
              player={players[currentPlayer]}
              penalty={penalty}
            />
          </div>
        )}

        <div className={result === null ? "hilo-actions mt-5" : "hilo-actions mt-3"}>
          {!roundOver ? (
            <GuessButtons
              odds={odds}
              disabled={!currentCard}
              onGuess={makeGuess}
            />
          ) : (
            <button
              type="button"
              onClick={isParty ? continueAfterPenalty : resetRound}
              className="min-h-14 w-full rounded-2xl bg-white px-5 py-4 text-lg font-bold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isParty ? "Done — next player" : "New round"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}