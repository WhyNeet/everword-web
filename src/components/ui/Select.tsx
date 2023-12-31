import { cn } from "@/lib/cn";
import { HTMLAttributes, useEffect, useState } from "react";

export type SelectProps = HTMLAttributes<HTMLDivElement> & {
  items: SelectItem[];
  initialItem?: string;
  onSelectionChange: (item: string) => void;
};

export type SelectItem = string;

export const Select = ({
  items,
  initialItem,
  onSelectionChange,
  className,
  ...props
}: SelectProps) => {
  const [currentItem, setCurrentItem] = useState(initialItem ?? items[0]);

  useEffect(() => {
    onSelectionChange(currentItem);
  }, [currentItem]);

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden flex flex-col items-stretch gap-1",
        className
      )}
      {...props}
    >
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentItem(item)}
          className={`px-6 py-4 rounded-md font-semibold text-left ${
            item === currentItem ? "bg-black text-white" : "bg-black/10"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
