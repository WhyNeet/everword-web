import { HTMLAttributes } from "react";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

export const Header = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => (
  <header
    className={cn(
      "fixed top-0 inset-x-0 px-8 py-6 backdrop-blur z-50",
      className
    )}
    {...props}
  >
    <Logo />
  </header>
);
