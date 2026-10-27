"use client";

import { useState, type ActionDispatch, type RefObject } from "react";
import { MobileBottomNav } from "@/features/layout/mobile-bottom-nav";
import { SiteHeader } from "@/features/layout/site-header";
import type { SalonItem } from "@/features/salons/salons";
import type { AccountAction, AccountState } from "./account-state";
import { AppointmentsSection, type AppointmentsTab } from "./appointments-section";
import { MyReviewsSection } from "./my-reviews-section";
import { PersonalDetailsDialog } from "./personal-details-dialog";
import { ProfileHeader } from "./profile-header";
import { SavedSalonsSection } from "./saved-salons-section";
import { SettingsSection } from "./settings-section";

type AccountHubProps = {
  state: AccountState;
  now: Date;
  dispatch: ActionDispatch<[AccountAction]>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  tab: AppointmentsTab;
  onTabChange: (tab: AppointmentsTab) => void;
  savedSalons: SalonItem[];
  onUnsave: (id: string) => void;
  onOpenBooking: (bookingId: string) => void;
  onOpenChat: (bookingId: string) => void;
};

export function AccountHub({
  state,
  now,
  dispatch,
  headingRef,
  tab,
  onTabChange,
  savedSalons,
  onUnsave,
  onOpenBooking,
  onOpenChat,
}: AccountHubProps) {
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");

  return (
    <>
      <div className="px-6.75 pt-8 lg:px-18 lg:pt-16">
        <SiteHeader />
      </div>

      {/* Bottom padding keeps the last card above the fixed bottom navigation on phones. */}
      <main className="mx-auto w-full max-w-page px-6.75 pt-6 pb-28 lg:px-18 lg:pt-12 lg:pb-16">
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl/snug font-bold text-ink outline-none lg:text-3xl/snug">
          حساب من
        </h1>
        <p role="status" className="mt-3 rounded-lg bg-success/10 px-4 py-3 text-sm font-semibold text-success empty:hidden">
          {notice}
        </p>

        {/*
          Phones stack everything; from `lg` the bookings take the wide start column.
          The `1fr` second row takes the extra height when the bookings outgrow the side column;
          with two auto rows it was split between both and left a gap under the profile card.
        */}
        <div className="mt-5 flex flex-col gap-8 lg:mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-10 lg:gap-y-8 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <ProfileHeader profile={state.profile} onEdit={() => setEditing(true)} className="lg:col-start-2 lg:row-start-1" />
          <div className="flex min-w-0 flex-col gap-8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:gap-10">
            <AppointmentsSection
              bookings={state.bookings}
              now={now}
              dispatch={dispatch}
              tab={tab}
              onTabChange={onTabChange}
              onOpen={onOpenBooking}
              onChat={onOpenChat}
            />
            <MyReviewsSection bookings={state.bookings} now={now} dispatch={dispatch} />
          </div>
          <div className="flex min-w-0 flex-col gap-8 lg:col-start-2 lg:row-start-2">
            <SavedSalonsSection salons={savedSalons} onUnsave={onUnsave} />
            <SettingsSection profile={state.profile} onEdit={() => setEditing(true)} />
          </div>
        </div>
      </main>

      <PersonalDetailsDialog
        open={editing}
        profile={state.profile}
        onClose={() => setEditing(false)}
        onSave={(details) => {
          dispatch({ type: "profile", profile: { ...state.profile, ...details } });
          setEditing(false);
          setNotice("اطلاعات شما ذخیره شد.");
        }}
      />
      <MobileBottomNav active="account" />
    </>
  );
}
