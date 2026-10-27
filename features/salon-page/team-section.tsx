import { StarIcon } from "@/components/icons";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { TeamMember } from "@/features/salons/salon.types";
import { ProfileSection } from "./profile-section";

export function TeamSection({ team }: { team: TeamMember[] }) {
  return (
    <ProfileSection id="team" title="متخصصان">
      {/* `relative` keeps Chrome from counting the avatars' positioned layers as page overflow in RTL. */}
      <ul className="scrollbar-none relative -mx-6.75 flex gap-4 overflow-x-auto px-6.75 pb-1 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
        {team.map((member) => (
          <li key={member.id} className="flex w-28 shrink-0 flex-col items-center gap-2 text-center lg:w-auto">
            <SalonPhoto plate={member.plate} className="grid size-20 place-items-center rounded-full">
              <span aria-hidden="true" className="relative text-2xl font-bold text-accent">
                {member.name[0]}
              </span>
            </SalonPhoto>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm/snug font-bold text-ink">{member.name}</p>
              <p className="text-xs/normal text-text-muted">{member.role}</p>
              <p className="flex items-center justify-center gap-1 text-xs font-bold text-ink">
                <StarIcon width={14} height={14} className="text-stars" />
                <span className="sr-only">امتیاز</span>
                <span dir="ltr">{member.rating}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </ProfileSection>
  );
}
