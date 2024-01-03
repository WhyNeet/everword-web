import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

export type SwitchProps = {
  isChecked?: boolean;
  setIsChecked?: (checked: (prev: boolean) => boolean | boolean) => void;
} & HTMLAttributes<HTMLDivElement>;

export const Switch = ({
  className,
  children,
  isChecked,
  onClick,
  setIsChecked,
  ...props
}: SwitchProps) => {
  return (
    <div
      onClick={(e) => {
        onClick?.(e);
        setIsChecked?.((prev) => !prev);
      }}
      className="flex items-center gap-2 font-semibold text-sm"
    >
      <div
        className={cn(
          "rounded-full h-6 w-10 after:absolute after:inset-y-0.5 after:left-0.5 after:aspect-square bg-black/10 relative transition-colors after:rounded-full after:transition-all",
          isChecked
            ? "after:bg-white after:translate-x-[calc(100%-4px)] bg-blue-500"
            : "after:bg-black",
          className
        )}
        {...props}
      ></div>
      {children}
    </div>
  );
};
