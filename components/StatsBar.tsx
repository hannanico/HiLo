type StatsBarProps = {
  streak: number;
  streakLabel?: string;
  bestStreak?: number;
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-32 rounded-2xl bg-slate-900 p-4 text-center">
      <p className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}

export default function StatsBar({
  streak,
  streakLabel = "Streak",
  bestStreak,
}: StatsBarProps) {
  return (
    <div className="mb-6 flex justify-center gap-3">
      <Stat label={streakLabel} value={streak} />
      {bestStreak !== undefined && <Stat label="Best" value={bestStreak} />}
    </div>
  );
}