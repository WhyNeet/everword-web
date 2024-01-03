import { cn } from "@/lib/cn";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "placeholder:text-neutral-400 outline-none border-2 border-black/10 px-3 py-2 rounded-xl focus:border-blue-500 transition-colors",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";
