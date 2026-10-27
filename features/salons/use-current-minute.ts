"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / 60_000);

// The server has no visitor clock, so prerendered HTML never contains a time that hydration would contradict.
const getServerSnapshot = () => null;

/** The current time, rounded down to the minute; `null` until the page runs in the browser. */
export function useCurrentMinute() {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute === null ? null : new Date(minute * 60_000);
}
