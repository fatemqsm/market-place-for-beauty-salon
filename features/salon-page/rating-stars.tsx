import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  rating: number;
  size?: number;
  className?: string;
};

/** Five stars, filled to the nearest whole star. The label carries the exact value. */
export function RatingStars({ rating, size = 16, className }: RatingStarsProps) {
  const filled = Math.round(rating);
  return (
    <span role="img" aria-label={`امتیاز ${rating} از 5`} className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          width={size}
          height={size}
          className={index < filled ? "text-stars" : "text-primary"}
        />
      ))}
    </span>
  );
}
