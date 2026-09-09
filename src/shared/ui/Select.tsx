"use client";

import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";
import { ArrowDown } from "@/public/icon";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type SelectOption = {
  key: string | number;
  value: string;
};

const selectVariants = cva(
  [
    "relative flex w-full items-center justify-between",
    "rounded-md border",
    "px-4 py-3.5",
    "text-sm",
    "outline-none",
    "transition-colors duration-200",
    "cursor-pointer",
    "select-none",
  ],
  {
    variants: {
      state: {
        default: [
          "border-border",
          "bg-background",
          "text-foreground",
          "hover:border-primary",
          "focus:border-primary",
          "focus:ring-2",
          "focus:ring-primary/20",
        ],
        error: [
          "border-destructive",
          "bg-destructive/5",
          "text-destructive",
          "hover:border-destructive",
          "focus:border-destructive",
          "focus:ring-2",
          "focus:ring-destructive/20",
        ],
        disabled: [
          "cursor-not-allowed",
          "border-border",
          "bg-secondary",
          "text-muted-foreground",
          "opacity-60",
        ],
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);
type SelectVariantProps = VariantProps<typeof selectVariants>;

export type SelectProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  placeholder?: string;
  label?: string;
  options: SelectOption[];
  errorText?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (key: string | number) => void;
  disabled?: boolean;
  state?: SelectVariantProps["state"];
};
/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      placeholder,
      options = [],
      errorText,
      value,
      defaultValue,
      onChange,
      disabled = false,
      state,
      className,
      id: providedId,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = providedId ?? generatedId;
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<
      string | number | undefined
    >(defaultValue);
    const selectedKey = isControlled ? value : internalValue;
    const [isOpen, setIsOpen] = useState(false);
    const [focusIndex, setFocusIndex] = useState(-1);
    /* ---------------------------------------------------------------------- */
    /*                               Derived state                             */
    /* ---------------------------------------------------------------------- */
    const selectedOption = options.find((option) => option.key === selectedKey);
    const shouldFloatLabel = Boolean(isOpen || selectedOption);
    const currentState: SelectVariantProps["state"] =
      disabled ? "disabled"
      : errorText ? "error"
      : (state ?? "default");
    /* ---------------------------------------------------------------------- */
    /*                                Handlers                                */
    /* ---------------------------------------------------------------------- */
    const closeSelect = () => {
      setIsOpen(false);
      setFocusIndex(-1);
    };
    const openSelect = () => {
      if (disabled || options.length === 0) return;
      setIsOpen(true);
      const selectedIndex = options.findIndex(
        (option) => option.key === selectedKey,
      );
      setFocusIndex(selectedIndex >= 0 ? selectedIndex : 0);
    };

    const toggleSelect = () => {
      if (disabled || options.length === 0) return;
      if (isOpen) {
        closeSelect();
      } else {
        openSelect();
      }
    };

    const selectOption = (option: SelectOption) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalValue(option.key);
      }
      onChange?.(option.key);
      closeSelect();
    };
    /* ---------------------------------------------------------------------- */
    /*                             Keyboard events                             */
    /* ---------------------------------------------------------------------- */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || options.length === 0) return;
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          if (!isOpen) {
            openSelect();
            return;
          }
          if (focusIndex >= 0) {
            selectOption(options[focusIndex]);
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            openSelect();
            return;
          }
          setFocusIndex((prev) => {
            if (prev < 0) return 0;
            return (prev + 1) % options.length;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          if (!isOpen) {
            openSelect();
            return;
          }
          setFocusIndex((prev) => {
            if (prev < 0) return options.length - 1;
            return (prev - 1 + options.length) % options.length;
          });
          break;
        case "Escape":
          event.preventDefault();
          closeSelect();
          break;
        case "Tab":
          closeSelect();
          break;
        default:
          break;
      }
    };
    /* ---------------------------------------------------------------------- */
    /*                              Click outside                              */
    /* ---------------------------------------------------------------------- */
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          closeSelect();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    /* ---------------------------------------------------------------------- */
    /*                         Scroll focused option                           */
    /* ---------------------------------------------------------------------- */
    useEffect(() => {
      if (!listRef.current || focusIndex < 0) return;
      const focusedOption = listRef.current.children[focusIndex] as HTMLElement;
      focusedOption?.scrollIntoView({
        block: "nearest",
      });
    }, [focusIndex]);
    /* ---------------------------------------------------------------------- */
    /*                                  Render                                 */
    /* ---------------------------------------------------------------------- */
    return (
      <div ref={containerRef} className="relative w-full" {...rest}>
        {/* ------------------------------------------------------------------ */}
        {/*                              Select wrapper                         */}
        {/* ------------------------------------------------------------------ */}
        <div className="relative">
          {/* ---------------------------------------------------------------- */}
          {/*                           Floating label                         */}
          {/* ---------------------------------------------------------------- */}
          {label && (
            <label
              htmlFor={selectId}
              className={cn(
                "pointer-events-none absolute z-10",
                "right-3",
                "bg-background",
                "px-1.5",
                "transition-all duration-200",
                shouldFloatLabel ? "top-[-8px] text-xs" : (
                  "top-1/2 -translate-y-1/2 text-sm"
                ),
                errorText ? "text-destructive"
                : shouldFloatLabel ? "text-muted-foreground"
                : "text-muted-foreground",
              )}
            >
              {label}
            </label>
          )}
          {/* ---------------------------------------------------------------- */}
          {/*                              Trigger                             */}
          {/* ---------------------------------------------------------------- */}
          <div
            id={selectId}
            ref={ref}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={`${selectId}-listbox`}
            aria-disabled={disabled}
            aria-invalid={Boolean(errorText)}
            className={cn(
              selectVariants({
                state: currentState,
              }),
              className,
            )}
            onClick={toggleSelect}
            onKeyDown={handleKeyDown}
          >
            {/* -------------------------------------------------------------- */}
            {/*                           Selected value                       */}
            {/* -------------------------------------------------------------- */}
            <span
              className={cn(
                "truncate",
                !selectedOption && "text-muted-foreground",
                label && shouldFloatLabel && "pt-0.5",
              )}
            >
              {selectedOption?.value ?? (!label ? placeholder : "")}
            </span>
            {/* -------------------------------------------------------------- */}
            {/*                              Arrow                             */}
            {/* -------------------------------------------------------------- */}
            <span
              aria-hidden="true"
              className={cn(
                "ml-3 flex shrink-0 items-center",
                "text-muted-foreground",
                "[&_path]:fill-current",
                "transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            >
              <ArrowDown
                style={{
                  scale: 1.3,
                }}
              />
            </span>
          </div>
          {/* ---------------------------------------------------------------- */}
          {/*                              Dropdown                            */}
          {/* ---------------------------------------------------------------- */}
          {isOpen && (
            <div
              id={`${selectId}-listbox`}
              ref={listRef}
              role="listbox"
              aria-labelledby={label ? selectId : undefined}
              className={cn(
                "absolute left-0 right-0 top-[calc(100%+4px)] z-50",
                "flex max-h-50 flex-col gap-1.5",
                "overflow-y-auto",
                "rounded-md border border-border",
                "bg-background",
                "p-1.5",
                "shadow-md",
              )}
            >
              {options.map((option, index) => {
                const isSelected = selectedKey === option.key;
                const isFocused = focusIndex === index;
                return (
                  <div
                    key={option.key}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "cursor-pointer rounded-md",
                      "px-3 py-2",
                      "text-sm",
                      "transition-colors duration-150",
                      "hover:bg-primary",
                      "hover:text-primary-foreground",
                      isFocused && "bg-primary text-primary-foreground",
                      isSelected &&
                        !isFocused &&
                        "bg-secondary text-foreground",
                    )}
                    onClick={() => selectOption(option)}
                    onMouseEnter={() => setFocusIndex(index)}
                  >
                    {option.value}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* ------------------------------------------------------------------ */}
        {/*                                Error                               */}
        {/* ------------------------------------------------------------------ */}
        {errorText && (
          <p className="mt-1 px-3 text-[10px] text-destructive">{errorText}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
