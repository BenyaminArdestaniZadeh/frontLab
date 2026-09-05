"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
interface SingleCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const SingleCheckbox = forwardRef<HTMLInputElement, SingleCheckboxProps>(
  (
    {
      label,
      checked: controlledChecked,
      onChange,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = useState(
      controlledChecked ?? false,
    );
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <label
        className={cn(
          "relative flex items-center gap-2",
          "cursor-pointer select-none",
          "rtl:flex-row-reverse",
          disabled && "cursor-not-allowed",
        )}
      >
        {/* ------------------------------------------------------------------ */}
        {/*                              Native input                           */}
        {/* ------------------------------------------------------------------ */}
        <input
          {...props}
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="peer sr-only"
        />
        {/* ------------------------------------------------------------------ */}
        {/*                            Custom checkbox                          */}
        {/* ------------------------------------------------------------------ */}
        <span
          aria-hidden="true"
          className={cn(
            "relative flex h-[18px] w-[18px] shrink-0",
            "items-center justify-center",
            "rounded-[4px]",
            "border",
            "transition-all duration-200",
            checked ?
              "border-primary bg-primary"
            : "border-muted-foreground bg-transparent",
            disabled && "opacity-60",
            "peer-focus-visible:ring-2",
            "peer-focus-visible:ring-primary/30",
            "peer-focus-visible:ring-offset-2",
            "peer-focus-visible:ring-offset-background",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute",
              "left-1/2 top-1/2",
              "h-[9px] w-[5px]",
              "-translate-x-1/2 -translate-y-[55%]",
              "rotate-45",
              "border-b-[2px] border-r-[2px]",
              "border-background",
              "transition-transform duration-200",
              checked ? "scale-100" : "scale-0",
            )}
          />
        </span>
        {/* ------------------------------------------------------------------ */}
        {/*                                Label                                 */}
        {/* ------------------------------------------------------------------ */}
        <span
          className={cn(
            "text-sm",
            "text-muted-foreground",
            disabled && "text-muted-foreground",
            className,
          )}
        >
          {label}
        </span>
      </label>
    );
  },
);

SingleCheckbox.displayName = "SingleCheckbox";

export default SingleCheckbox;
