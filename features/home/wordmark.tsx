type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <span dir="ltr" className={`text-gradient-button inline-block font-logo text-[30px] leading-none ${className}`}>
      VeriFAM
    </span>
  );
}
