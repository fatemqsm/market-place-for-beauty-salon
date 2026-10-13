"use client";

import { useState } from "react";
import type { SalonItem } from "./salons";

export function useSavedSalons(items: SalonItem[]) {
  const [savedIds, setSavedIds] = useState(() => new Set(items.filter((item) => item.saved).map((item) => item.id)));

  function toggleSaved(id: string) {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return { savedIds, toggleSaved };
}
