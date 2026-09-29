import type { Suit } from "@/types/game";

export const RANKS = [
  "A", "2", "3", "4", "5", "6", "7",
  "8", "9", "10", "J", "Q", "K",
];

export const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];

export const SUIT_NAMES: Record<Suit, string> = {
  "♠": "spades",
  "♥": "hearts",
  "♦": "diamonds",
  "♣": "clubs",
};

export const BEST_STREAK_KEY = "hilo-best-streak";
export const PARTY_SETTINGS_KEY = "hilo-party-settings";
export const PROMPTS_KEY = "hilo-prompts";

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 8;
export const MAX_PROMPTS = 40;
export const MAX_PROMPT_LENGTH = 80;