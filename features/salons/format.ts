// Prices and durations use Latin digits, like the ratings and prices elsewhere in the app.

export function formatToman(value: number) {
  return `${value.toLocaleString("en-US")} تومان`;
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const parts: string[] = [];
  if (hours) {
    parts.push(`${hours} ساعت`);
  }
  if (rest) {
    parts.push(`${rest} دقیقه`);
  }
  return parts.join(" و ");
}
