import type { Card } from "@/types/game";
import { RANKS, SUITS } from "@/lib/constants";

export function drawCard(): Card {
  const rankIndex = Math.floor(Math.random() * RANKS.length);
  const suitIndex = Math.floor(Math.random() * SUITS.length);

  return {
    rank: RANKS[rankIndex],
    value: rankIndex + 1,
    suit: SUITS[suitIndex],
  };
}