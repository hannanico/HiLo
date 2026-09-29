"use client";

import { useState } from "react";
import type { Card, Guess, Mode, Result, Screen } from "@/types/game";
import { drawCard } from "@/lib/cards";
import { getOdds, isCorrectGuess } from "@/lib/game";
import { getRandomPenalty } from "@/lib/prompts";
import { useBestStreak } from "@/hooks/useBestStreak";
import { usePrompts } from "@/hooks/usePrompts";

export function useHiLoGame() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [mode, setMode] = useState<Mode>("solo");

  const [players, setPlayers] = useState<string[]>([]);
  const [penaltyCounts, setPenaltyCounts] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [lastPlayer, setLastPlayer] = useState<string | null>(null);
  const [noDrinks, setNoDrinks] = useState(false);
  const [penalty, setPenalty] = useState<string | null>(null);

  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [previousCard, setPreviousCard] = useState<Card | null>(null);
  const [streak, setStreak] = useState(0);
  const [result, setResult] = useState<Result>(null);
  const [lastGuess, setLastGuess] = useState<Guess | null>(null);
  const [roundOver, setRoundOver] = useState(false);

  const { bestStreak, updateBestStreak } = useBestStreak();
  const { prompts, addPrompt, removePrompt, resetPrompts } = usePrompts();

  const odds = currentCard ? getOdds(currentCard) : null;

  function resetRound() {
    setCurrentCard(drawCard());
    setPreviousCard(null);
    setStreak(0);
    setResult(null);
    setLastGuess(null);
    setLastPlayer(null);
    setRoundOver(false);
    setPenalty(null);
  }

  function startSolo() {
    setMode("solo");
    resetRound();
    setScreen("game");
  }

  function openPartySetup() {
    setScreen("setup");
  }

  function startParty(names: string[], withoutDrinks: boolean) {
    setMode("party");
    setPlayers(names);
    setPenaltyCounts(names.map(() => 0));
    setNoDrinks(withoutDrinks);
    setCurrentPlayer(0);
    resetRound();
    setScreen("game");
  }

  function makeGuess(guess: Guess) {
    if (!currentCard || roundOver) return;

    const nextCard = drawCard();
    const correct = isCorrectGuess(currentCard, nextCard, guess);

    setPreviousCard(currentCard);
    setCurrentCard(nextCard);
    setLastGuess(guess);
    setResult(correct ? "correct" : "wrong");
    setLastPlayer(mode === "party" ? players[currentPlayer] : null);

    if (correct) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);

      if (mode === "solo") {
        updateBestStreak(nextStreak);
      } else {
        setCurrentPlayer((index) => (index + 1) % players.length);
      }
      return;
    }

    setRoundOver(true);
    if (mode === "party") {
  setPenaltyCounts((counts) =>
    counts.map((count, index) =>
      index === currentPlayer ? count + 1 : count
    )
  );

  setPenalty(
    getRandomPenalty(noDrinks, prompts) ?? "Make up your own penalty."
  );
}
  }

  function continueAfterPenalty() {
    setCurrentPlayer((index) => (index + 1) % players.length);
    setPreviousCard(null);
    setStreak(0);
    setResult(null);
    setLastGuess(null);
    setLastPlayer(null);
    setRoundOver(false);
    setPenalty(null);
  }

  function backToMenu() {
    resetRound();
    setScreen("menu");
  }

  return {
    screen,
    mode,
    players,
    currentPlayer,
    lastPlayer,
    penaltyCounts,
    penalty,
    prompts,
    addPrompt,
    removePrompt,
    resetPrompts,
    currentCard,
    previousCard,
    streak,
    bestStreak,
    result,
    lastGuess,
    roundOver,
    odds,
    startSolo,
    openPartySetup,
    startParty,
    makeGuess,
    continueAfterPenalty,
    resetRound,
    backToMenu,
  };
}

export type HiLoGame = ReturnType<typeof useHiLoGame>;