"use client";

import { useState, type ActionDispatch } from "react";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { chipClassName } from "@/components/ui/chip";
import { Dialog } from "@/components/ui/dialog";
import { formatDuration, formatToman } from "@/features/salons/format";
import type { SalonProfile, SalonService } from "@/features/salons/salon.types";
import { cn } from "@/lib/utils";
import type { BookingAction, BookingItem } from "./booking-state";

type StepServicesProps = {
  salon: SalonProfile;
  items: BookingItem[];
  dispatch: ActionDispatch<[BookingAction]>;
  /** A service with options that was picked on the salon page; its option picker opens first. */
  pendingServiceId: string | null;
};

export function StepServices({ salon, items, dispatch, pendingServiceId }: StepServicesProps) {
  const [category, setCategory] = useState("all");
  const [picker, setPicker] = useState<SalonService | null>(
    () => salon.services.find((service) => service.id === pendingServiceId && service.variants?.length) ?? null,
  );
  const visible = category === "all" ? salon.services : salon.services.filter((service) => service.categoryId === category);

  function toggle(service: SalonService) {
    if (items.some((item) => item.serviceId === service.id)) {
      dispatch({ type: "remove", serviceId: service.id });
    } else if (service.variants?.length) {
      setPicker(service);
    } else {
      dispatch({ type: "add", item: { serviceId: service.id } });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Stays under the booking header while the list scrolls. */}
      <div className="scrollbar-none sticky top-17 z-30 -mx-5 overflow-x-auto bg-background px-5 py-3 lg:mx-0 lg:px-0">
        <ul aria-label="دسته‌بندی خدمات" className="flex w-max gap-2">
          {[{ id: "all", label: "همه" }, ...salon.categories].map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={item.id === category}
                onClick={() => setCategory(item.id)}
                className={chipClassName(item.id === category, "focus-ring-2 h-10")}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex flex-col gap-3">
        {visible.map((service) => {
          const item = items.find((candidate) => candidate.serviceId === service.id);
          const variant = service.variants?.find((candidate) => candidate.id === item?.variantId);
          const selected = Boolean(item);
          return (
            <li key={service.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => toggle(service)}
                className={cn(
                  "focus-ring-2 flex w-full cursor-pointer items-start gap-4 rounded-xl border p-4 text-start transition-[border-color,background-color,box-shadow] duration-fast ease-standard",
                  selected ? "border-selected bg-accent/5 shadow-glow" : "border-border bg-background hover:border-accent-soft",
                )}
              >
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-base/snug font-bold text-ink">{service.name}</span>
                  <span className="text-sm/normal text-text-muted">
                    {variant
                      ? `${variant.label} · ${formatDuration(variant.durationMin)}`
                      : `${service.variants?.length ? "از " : ""}${formatDuration(service.durationMin)}`}
                  </span>
                  {service.description && <span className="text-sm/relaxed text-text-secondary">{service.description}</span>}
                  <span className="mt-1 text-base font-bold text-ink">
                    {!variant && service.variants?.length ? "از " : ""}
                    {formatToman(variant?.price ?? service.price)}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-fast ease-standard",
                    selected ? "border-selected bg-selected text-on-accent" : "border-border text-accent",
                  )}
                >
                  {selected ? <CheckIcon width={18} height={18} /> : <PlusIcon width={18} height={18} />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Dialog open={picker !== null} onClose={() => setPicker(null)} title={picker ? `${picker.name}: انتخاب نوع` : ""}>
        {picker && (
          <VariantPicker
            service={picker}
            onSelect={(variantId) => {
              dispatch({ type: "add", item: { serviceId: picker.id, variantId } });
              setPicker(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}

function VariantPicker({ service, onSelect }: { service: SalonService; onSelect: (variantId: string) => void }) {
  const variants = service.variants ?? [];
  const [chosen, setChosen] = useState(variants[0]?.id);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (chosen) {
          onSelect(chosen);
        }
      }}
      className="flex flex-col gap-4"
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">نوع خدمت</legend>
        {variants.map((variant) => (
          <label
            key={variant.id}
            className={cn(
              "focus-ring-2 flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-[border-color,background-color] duration-fast ease-standard",
              chosen === variant.id ? "border-selected bg-accent/5" : "border-border hover:border-accent-soft",
            )}
          >
            <input
              type="radio"
              name="variant"
              value={variant.id}
              checked={chosen === variant.id}
              onChange={() => setChosen(variant.id)}
              className="size-5 shrink-0 accent-accent"
            />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-base font-semibold text-ink">{variant.label}</span>
              <span className="text-sm text-text-muted">{formatDuration(variant.durationMin)}</span>
            </span>
            <span className="shrink-0 text-base font-bold text-ink">{formatToman(variant.price)}</span>
          </label>
        ))}
      </fieldset>
      <Button type="submit" className="h-12 w-full">
        افزودن به رزرو
      </Button>
    </form>
  );
}
