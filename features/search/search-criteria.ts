export const serviceOptions = ["تمام خدمات", "ناخن", "رنگ مو", "کوتاهی مو", "استایل‌دهی مو"];

/** Minimum ratings, in the order the design lays the tags out. */
export const ratingOptions = [4, 3, 2];

export type SearchSort = "default" | "nearest" | "top-rated";

export const sortOptions: { id: SearchSort; label: string }[] = [
  { id: "nearest", label: "نزدیک‌ترین" },
  { id: "default", label: "پیش‌فرض" },
  { id: "top-rated", label: "بالاترین امتیاز" },
];

export const priceRange = { min: 1_000_000, max: 5_000_000, step: 50_000 };

export type TimeSlot = "any" | "morning" | "afternoon" | "evening" | "custom";

export const timeSlots: { id: TimeSlot; label: string; hours?: string }[] = [
  { id: "any", label: "هر زمان" },
  { id: "morning", label: "صبح", hours: "9 تا 12" },
  { id: "afternoon", label: "بعدازظهر", hours: "12 تا 17" },
  { id: "evening", label: "عصر", hours: "17 تا 24" },
  { id: "custom", label: "دلخواه" },
];

export const customHours = Array.from({ length: 16 }, (_, index) => `${String(index + 8).padStart(2, "0")}:00`);

export type Coordinates = { latitude: number; longitude: number };

export type SearchCriteria = {
  service: string;
  location: string;
  coordinates: Coordinates | null;
  date: string | null;
  timeSlot: TimeSlot;
  customFrom: string;
  customTo: string;
  salonName: string;
  minRating: number | null;
  priceFrom: string;
  priceTo: string;
  sort: SearchSort;
};

export const initialCriteria: SearchCriteria = {
  service: "",
  location: "",
  coordinates: null,
  date: null,
  timeSlot: "any",
  customFrom: "09:00",
  customTo: "18:00",
  salonName: "",
  minRating: null,
  priceFrom: "",
  priceTo: "",
  sort: "default",
};

export type SearchErrors = Partial<Record<"form" | "price" | "time", string>>;

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

/** Accepts Persian, Arabic, or Latin digits and keeps Latin digits only. */
export function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
    .replace(/\D/g, "");
}

export function validateCriteria(criteria: SearchCriteria): SearchErrors {
  const errors: SearchErrors = {};

  if (criteria.priceFrom && criteria.priceTo && Number(criteria.priceFrom) > Number(criteria.priceTo)) {
    errors.price = "حداقل قیمت نباید از حداکثر قیمت بیشتر باشد.";
  }

  if (criteria.timeSlot === "custom" && criteria.customFrom >= criteria.customTo) {
    errors.time = "ساعت پایان باید بعد از ساعت شروع باشد.";
  }

  const hasCriterion =
    criteria.service.trim() !== "" ||
    criteria.location.trim() !== "" ||
    criteria.date !== null ||
    criteria.timeSlot !== "any" ||
    criteria.salonName.trim() !== "";
  if (!hasCriterion) {
    errors.form = "برای جستجو، خدمات، زمان، موقعیت مکانی یا نام سالن را مشخص کنید.";
  }

  return errors;
}

export function formatPrice(value: string) {
  return value ? Number(value).toLocaleString("en-US") : "";
}

export function describeRating(minRating: number) {
  return `بالاتر از ${minRating}`;
}
