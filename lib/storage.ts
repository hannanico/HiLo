import type { PartySettings, Prompt } from "@/types/game";
import {
  BEST_STREAK_KEY,
  PARTY_SETTINGS_KEY,
  PROMPTS_KEY,
} from "@/lib/constants";

export function readBestStreak(): number {
  try {
    const saved = window.localStorage.getItem(BEST_STREAK_KEY);
    const parsed = Number(saved);

    if (saved !== null && Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  } catch {
    // Storage unavailable; the game still works.
  }

  return 0;
}

export function saveBestStreak(value: number) {
  try {
    window.localStorage.setItem(BEST_STREAK_KEY, String(value));
  } catch {
    // Best streak stays available for this session only.
  }
}

export function readPartySettings(): PartySettings | null {
  try {
    const raw = window.localStorage.getItem(PARTY_SETTINGS_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;

    const { names, noDrinks } = parsed as Partial<PartySettings>;

    if (
      !Array.isArray(names) ||
      !names.every((name) => typeof name === "string") ||
      typeof noDrinks !== "boolean"
    ) {
      return null;
    }

    return { names, noDrinks };
  } catch {
    return null;
  }
}

export function savePartySettings(settings: PartySettings) {
  try {
    window.localStorage.setItem(
      PARTY_SETTINGS_KEY,
      JSON.stringify(settings)
    );
  } catch {
    // Settings stay available for this session only.
  }
}

export function readPrompts(): Prompt[] | null {
  try {
    const raw = window.localStorage.getItem(PROMPTS_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    return parsed.filter(
      (item): item is Prompt =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.text === "string" &&
        (item.type === "drink" || item.type === "dare")
    );
  } catch {
    return null;
  }
}

export function savePrompts(prompts: Prompt[]) {
  try {
    window.localStorage.setItem(PROMPTS_KEY, JSON.stringify(prompts));
  } catch {
    // Prompts stay available for this session only.
  }
}