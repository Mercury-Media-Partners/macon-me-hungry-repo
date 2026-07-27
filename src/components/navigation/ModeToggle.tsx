import { useStore } from "@nanostores/react";
import { $siteMode, setSiteMode } from "@/stores/modeStore";
import { Sun, Moon } from "lucide-react";

export const ModeToggle = () => {
  const mode = useStore($siteMode);
  const isNight = mode === "night";

  const toggleMode = () => {
    setSiteMode(isNight ? "day" : "night");
  };

  return (
    <button
      onClick={toggleMode}
      role="switch"
      aria-checked={isNight}
      aria-label="Toggle Day/Night Mode"
      className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border bg-muted/50 p-0.5 transition-all duration-300 hover:border-accent/30 cursor-pointer select-none"
    >
      <span
        className={`flex h-5.5 w-5.5 items-center justify-center rounded-full bg-background shadow-md transform transition-all duration-300 ${
          isNight ? "translate-x-5 text-indigo-400" : "translate-x-0 text-amber-500"
        }`}
      >
        {isNight ? (
          <Moon size={10} fill="currentColor" className="rotate-[-10deg]" />
        ) : (
          <Sun size={10} fill="currentColor" className="animate-spin-slow" />
        )}
      </span>
    </button>
  );
};
