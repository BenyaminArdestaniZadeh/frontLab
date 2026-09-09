"use client";

import { forwardRef, ReactNode, useId, useState } from "react";
import { cn } from "@/lib";
import { ArrowDown } from "@/public/icon";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export interface AccordionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}
/* -------------------------------------------------------------------------- */
/*                                  Accordion                                   */
/* -------------------------------------------------------------------------- */
const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      title,
      children,
      defaultOpen = false,
      open,
      onOpenChange,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const triggerId = useId();
    const contentId = useId();
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const handleToggle = () => {
      if (disabled) {
        return;
      }
      const nextOpen = !isOpen;
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    };

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className={cn("w-full border-b border-border", className)}
        {...props}
      >
        <button
          id={triggerId}
          type="button"
          disabled={disabled}
          aria-expanded={isOpen}
          aria-controls={contentId}
          data-state={isOpen ? "open" : "closed"}
          onClick={handleToggle}
          className={cn(
            "flex w-full items-center justify-between",
            "py-4 text-start",
            "text-sm font-medium",
            "text-foreground",
            "cursor-pointer",
            "disabled:cursor-not-allowed",
            "disabled:opacity-50",
          )}
        >
          <span>{title}</span>
          <span
            aria-hidden="true"
            className={cn(
              "ms-4 shrink-0",
              "text-muted-foreground",
              "[&_path]:fill-current",
              "transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          >
            <ArrowDown />
          </span>
        </button>
        <div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          hidden={!isOpen}
          data-state={isOpen ? "open" : "closed"}
          className={cn(
            "overflow-hidden",
            "pb-4",
            "text-sm text-muted-foreground",
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

Accordion.displayName = "Accordion";

export default Accordion;
