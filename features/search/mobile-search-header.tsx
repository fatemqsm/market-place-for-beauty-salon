"use client";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { ArrowIcon, MapPinPlusIcon } from "@/components/icons";
import { useSearch } from "./search-context";
import { serviceOptions } from "./search-criteria";
import { describeTime } from "./time-field";

type MobileSearchHeaderProps = {
  mapView: boolean;
  onToggleMap: () => void;
};

export function MobileSearchHeader({ mapView, onToggleMap }: MobileSearchHeaderProps) {
  const { criteria } = useSearch();
  const router = useRouter();
  const details = [describeTime(criteria), criteria.location.trim()].filter(Boolean);

  function goBack() {
    // A search opened from a shared link has no page to return to.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-full bg-background px-2 py-1 lg:hidden">
      <button
        type="button"
        aria-label="بازگشت"
        onClick={goBack}
        className="focus-ring-2 flex h-6 w-7 shrink-0 cursor-pointer items-center justify-center rounded-sm text-text-secondary"
      >
        <ArrowIcon className="-scale-x-100" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="flex h-7 items-center text-lg/none font-semibold text-ink">
          <span className="truncate">{criteria.service || serviceOptions[0]}</span>
        </p>
        {details.length > 0 && (
          <p className="flex h-7 min-w-0 items-center gap-1 text-base/none font-semibold whitespace-nowrap text-text-secondary">
            {details.map((detail, index) => (
              <Fragment key={detail}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-lg/none">
                    /
                  </span>
                )}
                <span className="truncate">{detail}</span>
              </Fragment>
            ))}
          </p>
        )}
      </div>
      <button
        type="button"
        aria-label="نقشه"
        aria-pressed={mapView}
        onClick={onToggleMap}
        className="focus-ring-2 flex shrink-0 cursor-pointer items-center justify-center rounded-4xl border-[0.5px] border-text-secondary p-2.25 text-text-secondary"
      >
        <MapPinPlusIcon />
      </button>
    </div>
  );
}
