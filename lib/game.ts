import type { Card, Guess, Odds } from "@/types/game";
import { RANKS } from "@/lib/constants";

export function isCorrectGuess(current: Card, next: Card, guess: Guess) {
  if (guess === "higher") return next.value > current.value;
  if (guess === "lower") return next.value < current.value;
  return next.value === current.value;
}

export function getOdds(card: Card): Odds {
  const total = RANKS.length;

  return {
    higher: ((total - card.value) / total) * 100,
    lower: ((card.value - 1) / total) * 100,
    same: (1 / total) * 100,
  };
}