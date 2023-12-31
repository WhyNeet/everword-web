import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export const h1 = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      "text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900",
      className
    )}
    {...props}
  />
);

export const h2 = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      "lg:text-4xl text-3xl font-semibold text-neutral-900",
      className
    )}
    {...props}
  />
);

export const h3 = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-lg font-semibold text-neutral-900", className)}
    {...props}
  />
);

export const paragraphVariants = cva("", {
  variants: {
    variant: {
      default: "text-sm text-neutral-600",
      primary: "text-sm font-medium",
      tertiary: "text-sm text-neutral-500 font-medium",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const p = ({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof paragraphVariants>) => (
  <p className={cn(paragraphVariants({ variant, className }))} {...props} />
);

export const Text = { h1, h2, h3, p };
