import Image from "next/image";
import salonCard from "./salon-card-float.png";

const columns = [
  [
    { label: "Zahra", detail: "Blow Dry", time: "9:00", tone: "bg-[#8fd8ee]" },
    { label: "Olivia", detail: "Blow Dry", time: "11:00", tone: "bg-[#8fd8ee]" },
  ],
  [
    { label: "Grace", detail: "Massage", time: "9:45", tone: "bg-[#ffbf68]" },
    { label: "Matilda", detail: "Blow Dry", time: "11:30", tone: "bg-[#ff9dbc]" },
  ],
  [
    { label: "Leanne", detail: "Massage", time: "10:15", tone: "bg-[#d9d9d9]" },
    { label: "Kevin", detail: "Cut", time: "11:30", tone: "bg-[#6ad8cd]" },
  ],
  [
    { label: "Jenny", detail: "Massage", time: "10:00", tone: "bg-[#6ad8cd]" },
    { label: "Brandi", detail: "Blow Dry", time: "12:00", tone: "bg-[#8fd8ee]" },
  ],
  [
    { label: "Brenda", detail: "Blow Dry", time: "9:00", tone: "bg-[#ff9dbc]" },
    { label: "Open", detail: "", time: "11:00", tone: "bg-[#ffbf68]" },
  ],
];

const staff = ["Z", "A", "M", "K", "B"];

export function BookingPreview() {
  return (
    <div className="relative pb-16" aria-hidden="true">
      <div dir="ltr" className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_50px_rgba(40,20,30,0.08)] ring-1 ring-black/[0.04]">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3 border-b border-[#f0f0f0] px-4 py-3 text-[11px] text-[#8a8688]">
              <span className="font-semibold text-[#2c2c2c]">Fresha</span>
              <span>The 7th Heaven Beauty</span>
              <span>Tue 23 Apr</span>
            </div>
            <div className="flex gap-3 px-4 py-3">
              {staff.map((initial) => (
                <span
                  key={initial}
                  className="grid size-8 place-items-center rounded-full bg-[#f3d5dc] text-[11px] font-semibold text-[#6a3d48]"
                >
                  {initial}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2 px-3 pb-4">
              {columns.map((column) => (
                <div key={column[0].label} className="space-y-2">
                  {column.map((block) => (
                    <div key={`${block.label}-${block.time}`} className={`rounded-lg px-2 py-2 text-[10px] leading-tight text-[#243038] ${block.tone}`}>
                      <p className="font-semibold">{block.time}</p>
                      <p>{block.label}</p>
                      {block.detail ? <p>{block.detail}</p> : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-11 shrink-0 flex-col items-center gap-4 bg-[#2c2e34] py-4 text-white/80">
            <span className="size-2 rounded-full bg-white" />
            <span className="size-4 rounded-sm border border-white/70" />
            <span className="size-4 rounded-full border border-white/70" />
            <span className="size-4 rounded-sm border border-white/70" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 start-6 w-36 overflow-hidden rounded-[18px] shadow-[0_16px_40px_rgba(20,20,30,0.18)] sm:start-10 sm:w-40">
        <Image src={salonCard} alt="" width={134} height={180} className="h-auto w-full" />
      </div>
    </div>
  );
}
