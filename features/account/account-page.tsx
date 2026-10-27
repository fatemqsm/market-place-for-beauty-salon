"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useReducer, useRef, useState } from "react";
import { useCurrentMinute } from "@/features/salons/use-current-minute";
import { useSavedSalons } from "@/features/salons/use-saved-salons";
import { createSampleAccount, sampleSavedSalons } from "./account-data";
import { AccountHub } from "./account-hub";
import { accountReducer } from "./account-state";
import { AppointmentDetails } from "./appointment-details";
import type { AppointmentsTab } from "./appointments-section";
import { ChatView } from "./chat-view";

type View = "hub" | "details" | "chat";

export function AccountPage() {
  const now = useCurrentMinute();

  // The sample bookings are placed relative to the visitor's clock, which the server does not have.
  if (!now) {
    return (
      <p role="status" className="grid min-h-dvh place-items-center bg-background p-8 text-center text-base font-semibold text-text-secondary">
        در حال بارگذاری حساب…
      </p>
    );
  }
  return <AccountViews now={now} />;
}

function AccountViews({ now }: { now: Date }) {
  const [state, dispatch] = useReducer(accountReducer, now, createSampleAccount);
  const [tab, setTab] = useState<AppointmentsTab>("upcoming");
  const { savedIds, toggleSaved } = useSavedSalons(sampleSavedSalons);
  const hubHeadingRef = useRef<HTMLHeadingElement>(null);

  // The view lives in the URL, so the browser and Android back buttons close a booking or its chat.
  const searchParams = useSearchParams();
  const booking = state.bookings.find((item) => item.id === searchParams.get("booking")) ?? null;
  const view: View = booking ? (searchParams.get("view") === "chat" ? "chat" : "details") : "hub";

  // How many views this page pushed. Closing one of them goes back in history; a view opened from a
  // link (nothing pushed) is replaced instead, so closing it never leaves the site.
  const pushed = useRef(0);
  const hubScroll = useRef(0);
  const shownView = useRef(view);

  function open(query: string) {
    if (view === "hub") {
      hubScroll.current = window.scrollY;
    }
    pushed.current += 1;
    window.history.pushState(null, "", `?${query}`);
    window.scrollTo({ top: 0 });
  }

  function close() {
    if (pushed.current > 0) {
      pushed.current -= 1;
      window.history.back();
    } else {
      window.history.replaceState(null, "", view === "chat" && booking ? `?booking=${booking.id}` : "/account");
    }
  }

  // Back on the hub, the list returns to where the visitor left it and focus returns to its heading.
  useEffect(() => {
    if (shownView.current === view) {
      return;
    }
    shownView.current = view;
    if (view === "hub") {
      window.scrollTo({ top: hubScroll.current });
      hubHeadingRef.current?.focus({ preventScroll: true });
    }
  }, [view]);

  if (booking && view === "chat") {
    return <ChatView booking={booking} messages={state.messages} now={now} dispatch={dispatch} onBack={close} />;
  }
  if (booking) {
    return (
      <AppointmentDetails
        booking={booking}
        now={now}
        dispatch={dispatch}
        onBack={close}
        onChat={() => open(`booking=${booking.id}&view=chat`)}
      />
    );
  }
  return (
    <AccountHub
      state={state}
      now={now}
      dispatch={dispatch}
      headingRef={hubHeadingRef}
      tab={tab}
      onTabChange={setTab}
      savedSalons={sampleSavedSalons.filter((item) => savedIds.has(item.id))}
      onUnsave={toggleSaved}
      onOpenBooking={(id) => open(`booking=${id}`)}
      onOpenChat={(id) => open(`booking=${id}&view=chat`)}
    />
  );
}
