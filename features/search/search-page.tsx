import { MobileBottomNav } from "@/features/layout/mobile-bottom-nav";
import { SearchProvider } from "./search-context";
import type { SearchCriteria } from "./search-criteria";
import { SearchView } from "./search-view";

export function SearchPage({ criteria }: { criteria: SearchCriteria }) {
  return (
    <SearchProvider initial={criteria}>
      <SearchView />
      <MobileBottomNav active="search" />
    </SearchProvider>
  );
}
