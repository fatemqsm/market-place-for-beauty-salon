import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "@/features/search/search-page";
import { criteriaFromSearchParams, toSearchHref } from "@/features/search/search-url";

export const metadata: Metadata = {
  title: "جستجوی سالن | VeriFAM",
};

export default function Search(props: PageProps<"/search">) {
  return (
    <Suspense
      fallback={
        <p
          role="status"
          className="grid min-h-dvh place-items-center bg-surface p-8 text-center text-base font-semibold text-text-secondary"
        >
          در حال بارگذاری جستجو…
        </p>
      }
    >
      <SearchFromParams searchParams={props.searchParams} />
    </Suspense>
  );
}

async function SearchFromParams({ searchParams }: Pick<PageProps<"/search">, "searchParams">) {
  const criteria = criteriaFromSearchParams(await searchParams);
  // A new query (back, forward, or a new search) remounts the page with the criteria from the URL.
  return <SearchPage key={toSearchHref(criteria)} criteria={criteria} />;
}
