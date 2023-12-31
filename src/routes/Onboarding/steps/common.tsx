import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

export const StepFrame = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("h-full w-full px-8 pt-24 pb-8 flex flex-col", className)}
    {...props}
  />
);

export type StepProps = { next: () => void };
