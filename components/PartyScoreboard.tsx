type PartyScoreboardProps = {
  players: string[];
  penaltyCounts: number[];
  currentPlayer: number;
};

export default function PartyScoreboard({
  players,
  penaltyCounts,
  currentPlayer,
}: PartyScoreboardProps) {
  return (
    <section
      aria-label="Party scoreboard"
      className="mb-6 rounded-2xl bg-slate-900 p-4"
    >
      <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
        Wrong guesses
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {players.map((player, index) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm ${
              index === currentPlayer
                ? "bg-amber-400/15 text-amber-200"
                : "bg-slate-800 text-slate-200"
            }`}
          >
            <span className="truncate">{player}</span>
            <span className="font-bold">{penaltyCounts[index] ?? 0}</span>
          </div>
        ))}
      </div>
    </section>
  );
}