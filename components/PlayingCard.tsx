import type { Card } from "@/types/game";
import { SUIT_NAMES } from "@/lib/constants";

type PlayingCardProps = {
  card: Card;
};

export default function PlayingCard({ card }: PlayingCardProps) {
  const isRed = card.suit === "♥" || card.suit === "♦";

  return (
    <div
      className={`hilo-card relative flex h-52 w-36 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-xl sm:h-60 sm:w-44 ${
        isRed ? "text-red-600" : "text-slate-900"
      }`}
      aria-label={`${card.rank} of ${SUIT_NAMES[card.suit]}`}
    >
      <span className="absolute left-4 top-3 text-2xl font-bold">
        {card.rank}
      </span>
      <span className="hilo-card-symbol text-7xl" aria-hidden="true">
        {card.suit}
      </span>
      <span className="absolute bottom-3 right-4 rotate-180 text-2xl font-bold">
        {card.rank}
      </span>
    </div>
  );
}