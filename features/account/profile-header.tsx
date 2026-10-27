import { PencilIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CustomerProfile } from "./account.types";

type ProfileHeaderProps = {
  profile: CustomerProfile;
  onEdit: () => void;
  className?: string;
};

export function ProfileHeader({ profile, onEdit, className }: ProfileHeaderProps) {
  return (
    <section
      aria-label="مشخصات شما"
      className={cn("flex items-center gap-4 rounded-xl border border-border bg-background p-4 shadow-card", className)}
    >
      <span
        aria-hidden="true"
        className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-xl font-bold text-on-accent"
      >
        {profile.name.trim().charAt(0)}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-lg/snug font-bold text-ink">{profile.name}</p>
        <p className="text-sm text-text-secondary">
          <span dir="ltr">{profile.phone}</span>
        </p>
        <p className="w-fit rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-text-muted">حساب نمایشی</p>
      </div>
      <Button variant="secondary" aria-label="ویرایش اطلاعات شخصی" onClick={onEdit} className="size-11 shrink-0 rounded-full px-0">
        <PencilIcon width={18} height={18} />
      </Button>
    </section>
  );
}
