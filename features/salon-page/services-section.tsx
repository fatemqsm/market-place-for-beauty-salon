"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { buttonClassName } from "@/components/ui/button";
import { chipClassName } from "@/components/ui/chip";
import { formatDuration, formatToman } from "@/features/salons/format";
import type { SalonService, ServiceCategory } from "@/features/salons/salon.types";
import { cn } from "@/lib/utils";
import { ProfileSection } from "./profile-section";

type ServicesSectionProps = {
  salonId: string;
  categories: ServiceCategory[];
  services: SalonService[];
};

const previewCount = 6;

export function ServicesSection({ salonId, categories, services }: ServicesSectionProps) {
  const [category, setCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const filtered = category === "all" ? services : services.filter((service) => service.categoryId === category);
  const visible = showAll ? filtered : filtered.slice(0, previewCount);

  return (
    <ProfileSection id="services" title="خدمات و قیمت‌ها">
      <div className="scrollbar-none relative -mx-6.75 overflow-x-auto px-6.75 pb-1 lg:mx-0 lg:px-0">
        <ul aria-label="دسته‌بندی خدمات" className="flex w-max gap-2">
          {[{ id: "all", label: "همه" }, ...categories].map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={item.id === category}
                onClick={() => {
                  setCategory(item.id);
                  setShowAll(false);
                }}
                className={chipClassName(item.id === category, "focus-ring-2 h-10")}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-2 divide-y divide-border">
        {visible.map((service) => (
          <ServiceRow key={service.id} salonId={salonId} service={service} />
        ))}
      </ul>
      {filtered.length > previewCount && (
        <button
          type="button"
          aria-expanded={showAll}
          onClick={() => setShowAll(!showAll)}
          className={buttonClassName("secondary", "mt-4 h-11.5 w-full text-base lg:w-auto")}
        >
          {showAll ? "نمایش کمتر" : `نمایش همه خدمات (${filtered.length})`}
        </button>
      )}
    </ProfileSection>
  );
}

function ServiceRow({ salonId, service }: { salonId: string; service: SalonService }) {
  const [open, setOpen] = useState(false);
  const variantsId = useId();
  const hasVariants = Boolean(service.variants?.length);

  return (
    <li className="py-4">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-base/snug font-bold text-ink">{service.name}</h3>
          <p className="text-sm/normal text-text-muted">
            {hasVariants && "از "}
            {formatDuration(service.durationMin)}
          </p>
          {service.description && <p className="text-sm/relaxed text-text-secondary">{service.description}</p>}
          <p className="mt-1 text-base font-bold text-ink">
            {hasVariants && <span className="font-medium text-text-secondary">از </span>}
            {formatToman(service.price)}
          </p>
          {hasVariants && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={variantsId}
              onClick={() => setOpen(!open)}
              className="focus-ring-2 -ms-1 flex w-fit cursor-pointer items-center gap-1 rounded-sm px-1 py-1 text-sm font-semibold text-accent"
            >
              {open ? "بستن قیمت‌ها" : `قیمت ${service.variants!.length} نوع خدمت`}
              <ChevronDownIcon className={cn("transition-transform duration-base ease-standard", open && "-scale-y-100")} />
            </button>
          )}
        </div>
        <Link
          href={`/salons/${salonId}/book?service=${service.id}`}
          aria-label={`رزرو ${service.name}`}
          className={buttonClassName("secondary", "h-9 shrink-0 rounded-full px-4 text-sm")}
        >
          رزرو
        </Link>
      </div>
      {hasVariants && (
        <ul id={variantsId} hidden={!open} className="mt-3 divide-y divide-border rounded-lg bg-surface px-4">
          {service.variants!.map((variant) => (
            <li key={variant.id} className="flex items-center justify-between gap-4 py-3 text-sm/normal">
              <span className="flex flex-col">
                <span className="font-semibold text-ink">{variant.label}</span>
                <span className="text-text-muted">{formatDuration(variant.durationMin)}</span>
              </span>
              <span className="shrink-0 font-bold text-ink">{formatToman(variant.price)}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
