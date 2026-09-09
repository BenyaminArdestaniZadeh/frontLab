"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
interface RadioButtonProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}
/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { label, name, value, checked, onChange, disabled, className, ...props },
    ref,
  ) => {
    return (
      <label
        className={cn(
          "group relative flex items-center gap-2",
          "cursor-pointer select-none",
          disabled && "cursor-not-allowed",
        )}
      >
        <input
          ref={ref}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => onChange(value)}
          className="sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "flex h-3.75 w-3.75 shrink-0 items-center justify-center",
            "rounded-full border-[1.5px] border-muted-foreground bg-transparent",
            "transition-all duration-200",
            "group-has-checked:border-primary",
            disabled && "opacity-60",
          )}
        >
          <span
            className={cn(
              "h-[7px] w-[7px] rounded-full bg-primary",
              "transition-opacity duration-200",
              "opacity-0 group-has-checked:opacity-100",
            )}
          />
        </span>
        <span
          className={cn(
            "text-[13px] text-start",
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

RadioButton.displayName = "RadioButton";

export default RadioButton;
