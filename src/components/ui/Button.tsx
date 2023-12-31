import { cn } from "@/lib/cn";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

export const buttonVaraints = cva(
  "rounded-full flex justify-center items-center disabled:opacity-80 active:scale-95 disabled:active:scale-100 disabled:bg-black/80 transition-all",
  {
    variants: {
      variant: {
        default: "bg-black text-white font-medium active:bg-lime-400",
        secondary: "border border-black/10 active:bg-black/10",
      },
      size: {
        default: "py-3 px-6",
        icon: "h-10 aspect-square",
        sm: "py-2 px-4 text-sm",
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
