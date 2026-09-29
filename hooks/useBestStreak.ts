"use client";

import { useEffect, useState } from "react";
import { readBestStreak, saveBestStreak } from "@/lib/storage";

export function useBestStreak() {
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    setBestStreak(readBestStreak());
  }, []);

  function updateBestStreak(streak: number) {
    if (streak > bestStreak) {
      setBestStreak(streak);
      saveBestStreak(streak);
    }
  }

  return { bestStreak, updateBestStreak };
}