"use client";

import {
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useId,
  useState,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
export type TextAreaVariant = "outlined" | "filled" | "underline";

export interface TextAreaProps
  extends
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {
  error?: boolean;
  errorText?: string;
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}
/* -------------------------------------------------------------------------- */
/* TextArea Variants                                                          */
/* -------------------------------------------------------------------------- */
const textAreaVariants = cva(
  [
    "relative",
    "flex",
    "items-stretch",
    "w-full",
    "min-w-0",
    "box-border",
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
          "rounded-md",
          "hover:not-focus-within:border-muted-foreground",
          "focus-within:border-primary",
          "focus-within:shadow-[0_0_0_1px_var(--primary)]",
        ],
        filled: [
          "border",
          "border-transparent",
          "bg-secondary",
          "rounded-md",
          "hover:not-focus-within:bg-[color-mix(in_srgb,var(--secondary)_92%,var(--foreground))]",
          "focus-within:border-primary",
          "focus-within:shadow-[0_0_0_1px_var(--primary)]",
        ],
        underline: [
          "border-0",
          "border-b",
          "border-border",
          "rounded-none",
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
/* TextArea Row                                                               */
/* -------------------------------------------------------------------------- */
const textAreaRowVariants = cva(["flex", "items-stretch", "w-full", "min-w-0"]);
/* -------------------------------------------------------------------------- */
/* TextArea                                                                    */
/* -------------------------------------------------------------------------- */
const textAreaInputVariants = cva([
  "flex-1",
  "w-full",
  "min-w-0",
  "box-border",
  "border-none",
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
  "resize-y",
  "min-h-[100px]",
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
const textAreaLabelVariants = cva([
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
]);
/* -------------------------------------------------------------------------- */
/* Adornment                                                                  */
/* -------------------------------------------------------------------------- */
const textAreaAdornmentVariants = cva([
  "inline-flex",
  "items-start",
  "justify-center",
  "shrink-0",
  "pt-[10px]",
  "text-muted-foreground",
]);
/* -------------------------------------------------------------------------- */
/* Error Message                                                              */
/* -------------------------------------------------------------------------- */
const textAreaErrorMessageVariants = cva([
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
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
    const textareaId = id ?? generatedId;
    const errorId = errorText ? `${textareaId}-error` : undefined;
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
            textAreaVariants({
              variant,
            }),
            error && [
              "border-destructive",
              "focus-within:border-destructive",
              "focus-within:shadow-[0_0_0_1px_var(--destructive)]",
            ],
            disabled && [
              "opacity-60",
              "cursor-not-allowed",
              "bg-muted",
              "hover:border-border",
            ],
            className,
          )}
        >
          {shouldShowLabel && (
            <label
              htmlFor={textareaId}
              className={cn(
                textAreaLabelVariants(),
                error ? "text-destructive" : "text-muted-foreground",
                isFocused && (error ? "text-destructive" : "text-primary"),
              )}
            >
              {label}
            </label>
          )}
          <div className={textAreaRowVariants()}>
            {startAdornment && (
              <span className={cn(textAreaAdornmentVariants(), "ms-3")}>
                {startAdornment}
              </span>
            )}
            <textarea
              {...props}
              ref={ref}
              id={textareaId}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              className={cn(
                textAreaInputVariants(),
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
              <span className={cn(textAreaAdornmentVariants(), "me-3")}>
                {endAdornment}
              </span>
            )}
          </div>
        </div>
        {errorText && (
          <span id={errorId} className={textAreaErrorMessageVariants()}>
            {errorText}
          </span>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
