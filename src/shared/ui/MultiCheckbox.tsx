"use client";

import React, { useState } from "react";
import { cn } from "@/lib";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
interface Option {
  key: string;
  value: string;
}

interface MultiCheckboxProps {
  isRow?: boolean;
  options: Option[];
  defaultValues?: string[];
  onChange?: (values: string[]) => void;
}
/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
  options,
  defaultValues = [],
  onChange,
  isRow = true,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);
  /* ------------------------------------------------------------------------ */
  /*                         Sync defaultValues -> state                      */
  /* ------------------------------------------------------------------------ */
  //   useEffect(() => {
  //     setSelectedValues(defaultValues);
  //   }, [defaultValues]);

  /* ------------------------------------------------------------------------ */
  /*                              Handle change                               */
  /* ------------------------------------------------------------------------ */
  const handleChange = (value: string) => {
    const newValues =
      selectedValues.includes(value) ?
        selectedValues.filter((selectedValue) => selectedValue !== value)
      : [...selectedValues, value];
    setSelectedValues(newValues);
    onChange?.(newValues);
  };
  /* ------------------------------------------------------------------------ */
  /*                                  Render                                  */
  /* ------------------------------------------------------------------------ */
  return (
    <div
      className={cn(
        "flex gap-2",
        isRow ? "flex-row flex-wrap" : "flex-col",
        "rtl:flex-row-reverse",
      )}
    >
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value);
        return (
          <label
            key={option.value}
            className={cn(
              "relative flex items-center gap-2",
              "cursor-pointer select-none",
              "rtl:flex-row-reverse",
            )}
          >
            {/* -------------------------------------------------------------- */}
            {/*                         Hidden checkbox                         */}
            {/* -------------------------------------------------------------- */}
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              className="peer sr-only"
            />
            {/* -------------------------------------------------------------- */}
            {/*                         Custom checkbox                        */}
            {/* -------------------------------------------------------------- */}
            <span
              aria-hidden="true"
              className={cn(
                "relative flex h-[18px] w-[18px] shrink-0",
                "items-center justify-center",
                "rounded-[4px]",
                "border",
                "transition-all duration-200",
                isChecked ?
                  "border-primary bg-primary"
                : "border-muted-foreground bg-transparent",
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
                  isChecked ? "scale-100" : "scale-0",
                )}
              />
            </span>
            {/* -------------------------------------------------------------- */}
            {/*                               Label                             */}
            {/* -------------------------------------------------------------- */}
            <span className={cn("text-[13px]", "text-muted-foreground")}>
              {option.key}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default MultiCheckbox;
