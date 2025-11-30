import * as React from "react";
import { cn } from "../../lib/utils";

type SwitchProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "onClick"
> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      id,
      checked = false,
      onCheckedChange,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const toggle = () => {
      if (disabled) return;
      onCheckedChange?.(!checked);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    };

    return (
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        ref={ref}
        className={cn(
          "relative inline-flex h-8 w-[64px] items-center rounded-full border border-cyan-400/40 bg-slate-900/70 px-1 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60",
          checked
            ? "shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_14px_30px_rgba(8,145,178,0.35)]"
            : "shadow-[0_0_0_1px_rgba(148,163,184,0.25),0_10px_20px_rgba(0,0,0,0.45)]",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[2px] rounded-full bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800"
        />
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 text-slate-900 transition-all duration-300 ease-out shadow-[0_10px_20px_rgba(0,0,0,0.35)]",
            checked
              ? "translate-x-9 bg-gradient-to-br from-cyan-200 via-emerald-200 to-cyan-400 text-slate-900 shadow-[0_12px_32px_rgba(6,182,212,0.45)]"
              : "translate-x-1"
          )}
        >
          <span
            className={cn(
              "absolute inset-0 rounded-full border border-white/60 transition-opacity",
              checked ? "opacity-70" : "opacity-20"
            )}
          />
        </span>
      </button>
    );
  }
);

Switch.displayName = "Switch";
