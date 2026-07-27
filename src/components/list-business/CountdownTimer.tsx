import { useState, useEffect } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function calcTimeLeft(deadlineDate: Date): TimeLeft {
  const diff = deadlineDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

interface Props {
  size?: "hero" | "compact";
  deadline: string;
  expiredLabel: string;
  unitDays: string;
  unitHours: string;
  unitMin: string;
  unitSec: string;
}

export const CountdownTimer = ({
  size = "hero",
  deadline,
  expiredLabel,
  unitDays,
  unitHours,
  unitMin,
  unitSec,
}: Props) => {
  const deadlineDate = new Date(deadline);
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(deadlineDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(deadlineDate)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (time.expired) {
    return (
      <p className="text-sm text-muted-foreground font-label uppercase tracking-widest">
        {expiredLabel}
      </p>
    );
  }

  const units = [
    { value: time.days, label: unitDays },
    { value: time.hours, label: unitHours },
    { value: time.minutes, label: unitMin },
    { value: time.seconds, label: unitSec },
  ];

  const isHero = size === "hero";

  return (
    <div className="flex items-center gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3">
          <div className={`flex flex-col items-center ${isHero ? "min-w-[56px]" : "min-w-[40px]"}`}>
            <span
              className={`font-display font-bold tabular-nums leading-none ${
                isHero ? "text-4xl md:text-5xl" : "text-2xl"
              } text-foreground`}
            >
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-label mt-1">
              {u.label}
            </span>
          </div>
          {i < 3 && (
            <span className={`font-display font-bold text-primary ${isHero ? "text-3xl" : "text-xl"} animate-pulse`}>
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

