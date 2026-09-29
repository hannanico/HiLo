"use client";

import GameScreen from "@/components/screens/GameScreen";
import MenuScreen from "@/components/screens/MenuScreen";
import PartySetupScreen from "@/components/screens/PartySetupScreen";
import { useHiLoGame } from "@/hooks/useHiLoGame";

export default function Home() {
  const game = useHiLoGame();

  if (game.screen === "menu") {
    return (
      <MenuScreen onSolo={game.startSolo} onParty={game.openPartySetup} />
    );
  }

  if (game.screen === "setup") {
  return (
    <PartySetupScreen
      prompts={game.prompts}
      onAddPrompt={game.addPrompt}
      onRemovePrompt={game.removePrompt}
      onResetPrompts={game.resetPrompts}
      onStart={game.startParty}
      onBack={game.backToMenu}
    />
  );
}

  return <GameScreen game={game} />;
}