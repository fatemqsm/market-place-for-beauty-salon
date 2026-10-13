"use client";

import { createContext, use, useState, type ReactNode } from "react";
import { initialCriteria, validateCriteria, type SearchCriteria, type SearchErrors } from "./search-criteria";

type SearchContextValue = {
  criteria: SearchCriteria;
  errors: SearchErrors;
  status: string | null;
  update: (patch: Partial<SearchCriteria>) => void;
  clearFilters: () => void;
  submit: () => boolean;
  heroInView: boolean;
  setHeroInView: (inView: boolean) => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

// No search API or results route exists yet, so a valid search can only report that honestly.
const unavailableMessage = "جستجو هنوز به سرور متصل نشده است و فعلاً نتیجه‌ای نمایش داده نمی‌شود.";

export function SearchProvider({ children }: { children: ReactNode }) {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [heroInView, setHeroInView] = useState(true);

  const validation = validateCriteria(criteria);
  const errors: SearchErrors = {
    price: validation.price,
    time: validation.time,
    form: attempted ? validation.form : undefined,
  };

  function update(patch: Partial<SearchCriteria>) {
    setCriteria((current) => ({ ...current, ...patch }));
    setStatus(null);
  }

  function clearFilters() {
    setCriteria(initialCriteria);
    setAttempted(false);
    setStatus(null);
  }

  function submit() {
    setAttempted(true);
    const valid = Object.keys(validation).length === 0;
    setStatus(valid ? unavailableMessage : null);
    return valid;
  }

  return (
    <SearchContext
      value={{ criteria, errors, status, update, clearFilters, submit, heroInView, setHeroInView }}
    >
      {children}
    </SearchContext>
  );
}

export function useSearch() {
  const context = use(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider.");
  }
  return context;
}
