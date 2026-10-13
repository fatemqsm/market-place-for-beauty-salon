"use client";

import { useRouter } from "next/navigation";
import { createContext, use, useState, type ReactNode } from "react";
import { initialCriteria, validateCriteria, type SearchCriteria, type SearchErrors } from "./search-criteria";
import { toSearchHref } from "./search-url";

type SearchContextValue = {
  criteria: SearchCriteria;
  errors: SearchErrors;
  update: (patch: Partial<SearchCriteria>) => void;
  clearFilters: () => void;
  submit: () => boolean;
  heroInView: boolean;
  setHeroInView: (inView: boolean) => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

type SearchProviderProps = {
  initial?: SearchCriteria;
  children: ReactNode;
};

export function SearchProvider({ initial = initialCriteria, children }: SearchProviderProps) {
  const router = useRouter();
  const [criteria, setCriteria] = useState(initial);
  const [attempted, setAttempted] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  const validation = validateCriteria(criteria);
  const errors: SearchErrors = {
    price: validation.price,
    time: validation.time,
    form: attempted ? validation.form : undefined,
  };

  function update(patch: Partial<SearchCriteria>) {
    setCriteria((current) => ({ ...current, ...patch }));
  }

  function clearFilters() {
    setCriteria(initialCriteria);
    setAttempted(false);
  }

  function submit() {
    setAttempted(true);
    const valid = Object.keys(validation).length === 0;
    if (valid) {
      router.push(toSearchHref(criteria));
    }
    return valid;
  }

  return (
    <SearchContext value={{ criteria, errors, update, clearFilters, submit, heroInView, setHeroInView }}>
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
