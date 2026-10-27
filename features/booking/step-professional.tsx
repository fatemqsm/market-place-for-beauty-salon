"use client";

import type { ActionDispatch, ReactNode } from "react";
import { StarIcon } from "@/components/icons";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { TeamMember } from "@/features/salons/salon.types";
import { cn } from "@/lib/utils";
import { anyProfessional, type BookingAction } from "./booking-state";

type StepProfessionalProps = {
  team: TeamMember[];
  professionalId: string | null;
  dispatch: ActionDispatch<[BookingAction]>;
};

export function StepProfessional({ team, professionalId, dispatch }: StepProfessionalProps) {
  return (
    <fieldset className="pt-4">
      <legend className="sr-only">متخصص</legend>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <li className="col-span-2 sm:col-span-3">
          <ProfessionalOption
            value={anyProfessional}
            checked={professionalId === anyProfessional}
            onSelect={() => dispatch({ type: "professional", professionalId: anyProfessional })}
            avatar={
              <span className="grid size-14 place-items-center rounded-full bg-accent/10 text-accent">
                <StarIcon width={28} height={28} />
              </span>
            }
            title="فرقی نمی‌کند"
            detail="بیشترین زمان آزاد؛ سالن متخصص را تعیین می‌کند."
            horizontal
          />
        </li>
        {team.map((member) => (
          <li key={member.id}>
            <ProfessionalOption
              value={member.id}
              checked={professionalId === member.id}
              onSelect={() => dispatch({ type: "professional", professionalId: member.id })}
              avatar={
                <SalonPhoto plate={member.plate} className="grid size-16 place-items-center rounded-full">
                  <span className="relative text-2xl font-bold text-accent">{member.name[0]}</span>
                </SalonPhoto>
              }
              title={member.name}
              detail={member.role}
              rating={member.rating}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

type ProfessionalOptionProps = {
  value: string;
  checked: boolean;
  onSelect: () => void;
  avatar: ReactNode;
  title: string;
  detail: string;
  rating?: number;
  horizontal?: boolean;
};

function ProfessionalOption({ value, checked, onSelect, avatar, title, detail, rating, horizontal = false }: ProfessionalOptionProps) {
  return (
    <label
      className={cn(
        "focus-ring-2 flex h-full cursor-pointer gap-3 rounded-xl border p-4 transition-[border-color,background-color,box-shadow] duration-fast ease-standard",
        horizontal ? "items-center" : "flex-col items-center text-center",
        checked ? "border-selected bg-accent/5 shadow-glow" : "border-border hover:border-accent-soft",
      )}
    >
      <input type="radio" name="professional" value={value} checked={checked} onChange={onSelect} className="sr-only" />
      <span aria-hidden="true" className="shrink-0">
        {avatar}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-base/snug font-bold text-ink">{title}</span>
        <span className="text-xs/normal text-text-muted">{detail}</span>
        {rating !== undefined && (
          <span className={cn("mt-1 flex items-center gap-1 text-xs font-bold text-ink", !horizontal && "justify-center")}>
            <StarIcon width={14} height={14} className="text-stars" />
            <span className="sr-only">امتیاز</span>
            <span dir="ltr">{rating}</span>
          </span>
        )}
      </span>
    </label>
  );
}
