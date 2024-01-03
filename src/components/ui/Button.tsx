import { cn } from "@/lib/cn";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

export const buttonVaraints = cva(
  "rounded-xl flex justify-center items-center gap-2 disabled:opacity-80 active:scale-95 disabled:active:scale-100 disabled:bg-opacity-80 disabled:cursor-not-allowed transition-all",
  {
    variants: {
      variant: {
        default: "bg-black text-white font-medium active:bg-blue-500",
        secondary:
          "border border-black/10 active:bg-black/10 disabled:bg-transparent",
        ghost:
          "bg-transparent hover:bg-black/10 disabled:hover:bg-transparent font-medium",
      },
      size: {
        default: "py-3 px-6",
        icon: "h-10 aspect-square",
        sm: "py-3 px-4 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export const Button = ({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVaraints>) => {
  return (
    <button
      className={cn(
        buttonVaraints({
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
};
