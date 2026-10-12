type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <span className={`font-sans text-[1.65rem] leading-none font-bold tracking-tight text-[#2c221f] ${className}`}>
      VeriFAM
    </span>
  );
}
