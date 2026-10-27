"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { ProfileSection } from "./profile-section";

// Longer descriptions start clamped to four lines.
const clampAfter = 220;

export function AboutSection({ about }: { about: string }) {
  const textId = useId();
  const [expanded, setExpanded] = useState(false);
  const long = about.length > clampAfter;

  return (
    <ProfileSection id="about" title="درباره ما">
      <p id={textId} className={cn("text-base/loose whitespace-pre-line text-text-secondary", long && !expanded && "line-clamp-4")}>
        {about}
      </p>
      {long && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => setExpanded(!expanded)}
          className="focus-ring-2 mt-2 cursor-pointer rounded-sm text-sm font-semibold text-accent"
        >
          {expanded ? "بستن" : "ادامه مطلب"}
        </button>
      )}
    </ProfileSection>
  );
}
