import { Button } from "@/components/ui/button";
import { CalendarIcon, FilterIcon, PinIcon, SearchIcon } from "./icons";

const fields = [
  { label: "انتخاب خدمات", icon: SearchIcon },
  { label: "انتخاب زمان", icon: CalendarIcon },
  { label: "موقعیت مکانی", icon: PinIcon },
];

export function SalonSearch() {
  return (
    <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
      <div role="search" aria-label="جستجوی سالن" className="flex flex-col gap-2 rounded-[22px] bg-white p-2 shadow-[0_12px_40px_rgba(70,40,50,0.06)] lg:flex-row lg:items-stretch">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <button
              key={field.label}
              type="button"
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-sm text-[#5c5556] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24181c] lg:border-s lg:border-[#eee] lg:first:border-s-0"
            >
              <Icon className="size-4 shrink-0" />
              <span>{field.label}</span>
            </button>
          );
        })}
        <Button className="min-h-12 min-w-28 px-6">جستجو</Button>
      </div>
      <div className="mt-3 flex">
        <Button variant="secondary" className="ms-auto min-h-11 px-4">
          <span>جستجو پیشرفته</span>
          <FilterIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
