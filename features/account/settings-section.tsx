import { useId } from "react";
import { NavigateNextIcon } from "@/components/icons";
import type { CustomerProfile } from "./account.types";

type SettingsSectionProps = {
  profile: CustomerProfile;
  onEdit: () => void;
  className?: string;
};

const rowClassName =
  "focus-ring-0 flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-start transition-colors duration-fast ease-standard hover:bg-hover";

export function SettingsSection({ profile, onEdit, className }: SettingsSectionProps) {
  const titleId = useId();
  const notifications = [profile.smsReminders && "یادآوری پیامکی", profile.offers && "پیشنهادها"].filter(Boolean);

  return (
    <section aria-labelledby={titleId} className={className}>
      <h2 id={titleId} className="text-lg/snug font-bold text-ink">
        تنظیمات
      </h2>
      <ul className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
        <li>
          <button type="button" onClick={onEdit} className={rowClassName}>
            <span className="flex min-w-0 flex-col">
              <span className="text-base font-semibold text-ink">اطلاعات شخصی</span>
              <span className="truncate text-xs text-text-muted">{profile.email || "نام، شماره موبایل و ایمیل"}</span>
            </span>
            <NavigateNextIcon width={18} height={18} className="shrink-0 -scale-x-100 text-text-secondary" />
          </button>
        </li>
        <li>
          <button type="button" onClick={onEdit} className={rowClassName}>
            <span className="flex min-w-0 flex-col">
              <span className="text-base font-semibold text-ink">اعلان‌ها</span>
              <span className="truncate text-xs text-text-muted">
                {notifications.length ? notifications.join(" و ") : "همه اعلان‌ها خاموش است"}
              </span>
            </span>
            <NavigateNextIcon width={18} height={18} className="shrink-0 -scale-x-100 text-text-secondary" />
          </button>
        </li>
      </ul>
    </section>
  );
}
