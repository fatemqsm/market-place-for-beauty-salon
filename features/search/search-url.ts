import {
  customHours,
  initialCriteria,
  ratingOptions,
  serviceOptions,
  sortOptions,
  timeSlots,
  type SearchCriteria,
} from "./search-criteria";

export const searchPath = "/search";

type RawSearchParams = Record<string, string | string[] | undefined>;

const maxTextLength = 100;

/** Only non-default values are written. Coordinates stay out of the URL. */
export function toSearchHref(criteria: SearchCriteria) {
  const params = new URLSearchParams();
  const set = (key: string, value: string) => {
    if (value) {
      params.set(key, value);
    }
  };

  set("service", criteria.service);
  set("location", criteria.location.trim());
  set("date", criteria.date ?? "");
  if (criteria.timeSlot !== "any") {
    set("time", criteria.timeSlot);
  }
  if (criteria.timeSlot === "custom") {
    set("from", criteria.customFrom);
    set("to", criteria.customTo);
  }
  set("name", criteria.salonName.trim());
  set("rating", criteria.minRating ? String(criteria.minRating) : "");
  set("minPrice", criteria.priceFrom);
  set("maxPrice", criteria.priceTo);
  if (criteria.sort !== "default") {
    set("sort", criteria.sort);
  }

  const query = params.toString();
  return query ? `${searchPath}?${query}` : searchPath;
}

/** Reads untrusted query values, dropping anything the search controls could not have produced. */
export function criteriaFromSearchParams(params: RawSearchParams): SearchCriteria {
  const read = (key: string) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  };
  const oneOf = <T extends string>(value: string, options: readonly T[], fallback: T) =>
    options.includes(value as T) ? (value as T) : fallback;

  const date = read("date");
  const timeSlot = oneOf(read("time"), timeSlots.map((slot) => slot.id), "any");
  const rating = Number(read("rating"));
  const price = (key: string) => (/^\d{1,12}$/.test(read(key)) ? read(key) : "");

  return {
    ...initialCriteria,
    service: oneOf(read("service"), serviceOptions, ""),
    location: read("location").slice(0, maxTextLength),
    date: /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) ? date : null,
    timeSlot,
    customFrom: oneOf(read("from"), customHours, initialCriteria.customFrom),
    customTo: oneOf(read("to"), customHours, initialCriteria.customTo),
    salonName: read("name").slice(0, maxTextLength),
    minRating: ratingOptions.includes(rating) ? rating : null,
    priceFrom: price("minPrice"),
    priceTo: price("maxPrice"),
    sort: oneOf(read("sort"), sortOptions.map((option) => option.id), "default"),
  };
}
