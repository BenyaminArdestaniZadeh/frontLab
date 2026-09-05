"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useState,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
export type TextFieldVariant = "outlined" | "filled" | "underline";
export interface TextFieldProps
  extends
    InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textFieldVariants> {
  error?: boolean;
  errorText?: string;
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}
/* -------------------------------------------------------------------------- */
/* TextField Variants                                                         */
/* -------------------------------------------------------------------------- */
const textFieldVariants = cva(
  [
    "relative",
    "flex",
    "w-full",
    "min-w-0",
    "box-border",
    "items-center",
    "rounded-md",
    "pt-2",
    "transition-[background-color,border-color,box-shadow]",
    "duration-200",
    "ease-in-out",
  ],
  {
    variants: {
      variant: {
        outlined: [
          "border",
          "border-border",
          "bg-background",
          "hover:not-focus-within:border-muted-foreground",
          "focus-within:border-primary",
          "focus-within:shadow-[0_0_0_1px_var(--primary)]",
        ],

        filled: [
          "border",
          "border-transparent",
          "bg-secondary",
          "hover:not-focus-within:bg-[color-mix(in_srgb,var(--secondary)_92%,var(--foreground))]",
          "focus-within:border-primary",
          "focus-within:shadow-[0_0_0_1px_var(--primary)]",
        ],

        underline: [
          "rounded-none",
          "border-0",
          "border-b",
          "border-border",
          "bg-transparent",
          "hover:not-focus-within:border-b-muted-foreground",
          "focus-within:border-b-primary",
          "focus-within:shadow-[0_1px_0_var(--primary)]",
        ],
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  },
);
/* -------------------------------------------------------------------------- */
/* Input                                                                      */
/* -------------------------------------------------------------------------- */
const inputVariants = cva([
  "flex-1",
  "w-full",
  "min-w-0",
  "box-border",
  "border-0",
  "outline-none",
  "bg-transparent",
  "py-[10px]",
  "px-3",
  "font-sans",
  "text-sm",
  "leading-[1.5]",
  "text-foreground",
  "caret-primary",
  "text-start",
  "placeholder:text-muted-foreground",
  "placeholder:opacity-100",
  "disabled:cursor-not-allowed",
  /* Autofill */
  "[&:-webkit-autofill]:[-webkit-text-fill-color:var(--foreground)]",
  "[&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_var(--background)_inset]",
  "[&:-webkit-autofill]:[transition:background-color_9999s_ease-out,color_9999s_ease-out]",
  "[&:-webkit-autofill:hover]:[-webkit-text-fill-color:var(--foreground)]",
  "[&:-webkit-autofill:hover]:[-webkit-box-shadow:0_0_0_1000px_var(--background)_inset]",
  "[&:-webkit-autofill:hover]:[transition:background-color_9999s_ease-out,color_9999s_ease-out]",
  "[&:-webkit-autofill:focus]:[-webkit-text-fill-color:var(--foreground)]",
  "[&:-webkit-autofill:focus]:[-webkit-box-shadow:0_0_0_1000px_var(--background)_inset]",
  "[&:-webkit-autofill:focus]:[transition:background-color_9999s_ease-out,color_9999s_ease-out]",
  /* Responsive */
  "max-[1023px]:text-base",
]);
/* -------------------------------------------------------------------------- */
/* Label                                                                      */
/* -------------------------------------------------------------------------- */
const labelVariants = cva([
  "absolute",
  "z-[1]",
  "top-0",
  "start-3",
  "-translate-y-1/2",
  "px-1.5",
  "pointer-events-none",
  "bg-background",
  "font-sans",
  "text-xs",
  "leading-none",
  "text-muted-foreground",
  "transition-colors",
  "duration-200",
  "focus-within:text-primary",
]);
/* -------------------------------------------------------------------------- */
/* Field Row                                                                  */
/* -------------------------------------------------------------------------- */
const fieldRowVariants = cva(["flex", "items-center", "w-full", "min-w-0"]);
/* -------------------------------------------------------------------------- */
/* Adornment                                                                  */
/* -------------------------------------------------------------------------- */
const adornmentVariants = cva([
  "inline-flex",
  "items-center",
  "justify-center",
  "shrink-0",
  "text-muted-foreground",
]);
/* -------------------------------------------------------------------------- */
/* Error Message                                                              */
/* -------------------------------------------------------------------------- */
const errorMessageVariants = cva([
  "block",
  "mt-1",
  "px-1",
  "font-sans",
  "text-xs",
  "leading-[1.4]",
  "text-destructive",
]);
/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = "outlined",
      error = false,
      errorText,
      label,
      startAdornment,
      endAdornment,
      id,
      disabled = false,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    /* ---------------------------------------------------------------------- */
    /* const and variables                                                     */
    /* ---------------------------------------------------------------------- */
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = errorText ? `${inputId}-error` : undefined;
    const isControlled = value !== undefined;
    const [isFocused, setIsFocused] = useState(false);
    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
      defaultValue !== undefined ? String(defaultValue) : "",
    );
    const currentValue = isControlled ? String(value ?? "") : uncontrolledValue;
    const hasValue = currentValue.length > 0;
    const shouldShowLabel = Boolean(label) && (isFocused || hasValue);
    /* ---------------------------------------------------------------------- */
    /* render                                                                  */
    /* ---------------------------------------------------------------------- */
    return (
      <div className="w-full min-w-0">
        <div
          className={cn(
            textFieldVariants({
              variant,
            }),
            error && [
              "border-destructive",
              "focus-within:border-destructive",
              "focus-within:shadow-[0_0_0_1px_var(--destructive)]",
            ],
            disabled && [
              "cursor-not-allowed",
              "opacity-60",
              "bg-muted",
              "hover:border-border",
            ],
            className,
          )}
        >
          {shouldShowLabel && (
            <label
              htmlFor={inputId}
              className={cn(
                labelVariants(),
                error ? "text-destructive" : "text-muted-foreground",
                isFocused && (error ? "text-destructive" : "text-primary"),
              )}
            >
              {label}
            </label>
          )}
          <div className={fieldRowVariants()}>
            {startAdornment && (
              <span className={cn(adornmentVariants(), "ms-3")}>
                {startAdornment}
              </span>
            )}
            <input
              {...props}
              ref={ref}
              id={inputId}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              className={cn(
                inputVariants(),
                label && shouldShowLabel ?
                  "placeholder:transparent"
                : "placeholder:text-muted-foreground",
              )}
              aria-invalid={error || undefined}
              aria-describedby={errorId}
              onChange={(event) => {
                if (!isControlled) {
                  setUncontrolledValue(event.target.value);
                }
                onChange?.(event);
              }}
              onFocus={(event) => {
                setIsFocused(true);
                onFocus?.(event);
              }}
              onBlur={(event) => {
                setIsFocused(false);
                onBlur?.(event);
              }}
            />
            {endAdornment && (
              <span className={cn(adornmentVariants(), "me-3")}>
                {endAdornment}
              </span>
            )}
          </div>
        </div>
        {errorText && (
          <span id={errorId} className={errorMessageVariants()}>
            {errorText}
          </span>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";
export default TextField;
