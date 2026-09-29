type PenaltyCardProps = {
  player: string;
  penalty: string;
};

export default function PenaltyCard({ player, penalty }: PenaltyCardProps) {
  return (
    <div className="mb-4 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-center">
      <p className="text-xs uppercase tracking-wider text-amber-300">
        {player}, your penalty
      </p>
      <p className="mt-1 text-lg font-semibold">{penalty}</p>
    </div>
  );
}