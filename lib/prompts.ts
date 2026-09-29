import type { Prompt, PromptType } from "@/types/game";

const DEFAULT_DRINKS = [
  "Take a sip.",
  "Take two sips.",
  "Give two sips to someone.",
  "Everyone drinks.",
  "Choose a player to drink with you.",
  "Take a sip for every player at the table.",
  "Finish your drink.",
  "The player on your left drinks.",
];

const DEFAULT_DARES = [
  "Tell a joke.",
  "Do 5 push-ups.",
  "Sing a line from a song.",
  "Speak in an accent until your next turn.",
  "Say something nice about the player on your left.",
  "Do your best impression of someone in the room.",
];

function toPrompts(texts: string[], type: PromptType): Prompt[] {
  return texts.map((text, index) => ({
    id: `default-${type}-${index}`,
    text,
    type,
  }));
}

export function getDefaultPrompts(): Prompt[] {
  return [
    ...toPrompts(DEFAULT_DRINKS, "drink"),
    ...toPrompts(DEFAULT_DARES, "dare"),
  ];
}

export function getRandomPenalty(
  noDrinks: boolean,
  prompts: Prompt[]
): string | null {
  const type: PromptType = noDrinks ? "dare" : "drink";
  const pool = prompts.filter((prompt) => prompt.type === type);

  if (pool.length === 0) return null;

  return pool[Math.floor(Math.random() * pool.length)].text;
}