import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className }: WordmarkProps) {
  return (
    <span dir="ltr" className={cn("text-gradient-button inline-block font-logo text-3xl/none", className)}>
      VeriFAM
    </span>
  );
}
