"use client";

import React, { forwardRef, useId, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type SwitchSize = "small" | "medium" | "large";

const switchTrackVariants = cva(
  [
    "relative inline-flex shrink-0 rounded-full border border-transparent",
    "transition-[background-color,border-color,box-shadow] duration-200 ease-standard",
    "bg-[color-mix(in_srgb,var(--foreground)_12%,var(--background))]",
    "shadow-[inset_0_1px_2px_rgb(0_0_0/0.06)]",
    "dark:bg-[color-mix(in_srgb,var(--foreground)_18%,var(--background))]",
    "dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]",
    "group-has-checked:border-primary/80 group-has-checked:bg-primary",
    "group-has-checked:shadow-none",
    "peer-focus-visible:ring-2",
    "peer-focus-visible:ring-primary/30",
    "peer-focus-visible:ring-offset-2",
    "peer-focus-visible:ring-offset-background",
  ],
  {
    variants: {
      size: {
        small: "h-4 w-7",
        medium: "h-5 w-9",
        large: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

const switchThumbVariants = cva(
  [
    "pointer-events-none absolute top-1/2 left-0.5",
    "-translate-y-1/2 rounded-full",
    "bg-background",
    "shadow-[0_1px_2px_rgb(0_0_0/0.12),0_1px_1px_rgb(0_0_0/0.08)]",
    "ring-1 ring-[color-mix(in_srgb,var(--foreground)_8%,transparent)]",
    "dark:shadow-[0_1px_3px_rgb(0_0_0/0.45),0_1px_2px_rgb(0_0_0/0.3)]",
    "dark:ring-[color-mix(in_srgb,var(--foreground)_14%,transparent)]",
    "transition-[transform,box-shadow] duration-200 ease-standard",
    "group-has-checked:translate-x-[var(--switch-travel)]",
    "group-has-checked:shadow-[0_2px_4px_rgb(0_0_0/0.16),0_1px_2px_rgb(0_0_0/0.1)]",
    "dark:group-has-checked:shadow-[0_2px_5px_rgb(0_0_0/0.5),0_1px_2px_rgb(0_0_0/0.35)]",
  ],
  {
    variants: {
      size: {
        small: ["size-3", "[--switch-travel:0.75rem]"],
        medium: ["size-4", "[--switch-travel:1rem]"],
        large: ["size-5", "[--switch-travel:1.25rem]"],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

const switchLabelVariants = cva("leading-none text-foreground", {
  variants: {
    size: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-base",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export interface SwitchProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof switchTrackVariants> {
  label?: string;
}
/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = "medium",
      checked: controlledChecked,
      defaultChecked = false,
      disabled = false,
      onChange,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(event.target.checked);
      }
      onChange?.(event);
    };

    return (
      <label
        htmlFor={switchId}
        className={cn(
          "group relative inline-flex items-center gap-2",
          "select-none",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          "rtl:flex-row-reverse",
        )}
      >
        {/* ------------------------------------------------------------------ */}
        {/*                              Native input                           */}
        {/* ------------------------------------------------------------------ */}
        <input
          {...props}
          ref={ref}
          id={switchId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="peer sr-only"
        />
        {/* ------------------------------------------------------------------ */}
        {/*                           Track + thumb                              */}
        {/* ------------------------------------------------------------------ */}
        <span
          aria-hidden="true"
          className={cn(
            switchTrackVariants({ size }),
            disabled && "opacity-60",
          )}
        >
          <span aria-hidden="true" className={switchThumbVariants({ size })} />
        </span>
        {/* ------------------------------------------------------------------ */}
        {/*                                 Label                                */}
        {/* ------------------------------------------------------------------ */}
        {label && (
          <span
            className={cn(
              switchLabelVariants({ size }),
              disabled && "text-muted-foreground",
              className,
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
