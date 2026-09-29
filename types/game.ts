export type Suit = "♠" | "♥" | "♦" | "♣";
export type Guess = "higher" | "lower" | "same";
export type Result = "correct" | "wrong" | null;
export type Screen = "menu" | "setup" | "game";
export type Mode = "solo" | "party";
export type PromptType = "drink" | "dare";

export type Prompt = {
  id: string;
  text: string;
  type: PromptType;
};

export type Card = {
  rank: string;
  value: number;
  suit: Suit;
};

export type Odds = {
  higher: number;
  lower: number;
  same: number;
};

export type PartySettings = {
  names: string[];
  noDrinks: boolean;
};