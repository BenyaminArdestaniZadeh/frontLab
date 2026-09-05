"use client";

import React, { forwardRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
export type ButtonColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "neutral";

export type ButtonVariant = "solid" | "soft" | "outline" | "text";
export type ButtonSize = "small" | "medium" | "large";
export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
/* -------------------------------------------------------------------------- */
/* Button Variants                                                            */
/* -------------------------------------------------------------------------- */
const buttonVariants = cva(
  [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "box-border",
    "select-none",
    "whitespace-nowrap",
    "font-sans",
    "font-normal",
    "leading-none",
    "transition-colors",
    "duration-normal",
    "ease-standard",
    "cursor-pointer",
    "focus-visible:outline-2",
    "focus-visible:outline-primary",
    "focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        solid: "",
        soft: "",
        outline: "",
        text: "",
      },
      color: {
        primary: "text-primary",
        secondary: "text-foreground",
        danger: "text-destructive",
        success: "text-success",
        warning: "text-warning",
        neutral: "text-foreground",
      },
      size: {
        small: ["min-w-[72px]", "h-8", "px-3", "text-xs", "rounded-md"],
        medium: ["min-w-[100px]", "h-10", "px-4", "text-sm", "rounded-lg"],
        large: ["min-w-[132px]", "h-12", "px-6", "text-base", "rounded-lg"],
      },
    },
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "medium",
    },
    compoundVariants: [
      /* -------------------------------------------------------------------- */
      /* Solid                                                                */
      /* -------------------------------------------------------------------- */
      {
        variant: "solid",
        color: "primary",
        class:
          "bg-primary text-background border border-primary hover:brightness-95 active:brightness-90",
      },
      {
        variant: "solid",
        color: "secondary",
        class:
          "bg-secondary text-foreground border border-secondary hover:brightness-95 active:brightness-90",
      },
      {
        variant: "solid",
        color: "danger",
        class:
          "bg-destructive text-background border border-destructive hover:brightness-95 active:brightness-90",
      },
      {
        variant: "solid",
        color: "success",
        class:
          "bg-success text-background border border-success hover:brightness-95 active:brightness-90",
      },
      {
        variant: "solid",
        color: "warning",
        class:
          "bg-warning text-foreground border border-warning hover:brightness-95 active:brightness-90",
      },
      {
        variant: "solid",
        color: "neutral",
        class:
          "bg-foreground text-background border border-foreground hover:opacity-90 active:opacity-80",
      },
      /* -------------------------------------------------------------------- */
      /* Soft                                                                 */
      /* -------------------------------------------------------------------- */
      {
        variant: "soft",
        color: "primary",
        class:
          "bg-primary/10 text-primary border border-transparent hover:bg-primary/15",
      },
      {
        variant: "soft",
        color: "secondary",
        class:
          "bg-secondary text-foreground border border-transparent hover:bg-secondary/80",
      },
      {
        variant: "soft",
        color: "danger",
        class:
          "bg-destructive/10 text-destructive border border-transparent hover:bg-destructive/15",
      },
      {
        variant: "soft",
        color: "success",
        class:
          "bg-success/10 text-success border border-transparent hover:bg-success/15",
      },
      {
        variant: "soft",
        color: "warning",
        class:
          "bg-warning/10 text-warning border border-transparent hover:bg-warning/15",
      },
      {
        variant: "soft",
        color: "neutral",
        class:
          "bg-secondary text-foreground border border-transparent hover:bg-secondary/80",
      },
      /* -------------------------------------------------------------------- */
      /* Outline                                                              */
      /* -------------------------------------------------------------------- */
      {
        variant: "outline",
        color: "primary",
        class:
          "bg-transparent text-primary border border-primary hover:bg-primary/10",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "bg-transparent text-foreground border border-border hover:bg-secondary",
      },
      {
        variant: "outline",
        color: "danger",
        class:
          "bg-transparent text-destructive border border-destructive hover:bg-destructive/10",
      },
      {
        variant: "outline",
        color: "success",
        class:
          "bg-transparent text-success border border-success hover:bg-success/10",
      },
      {
        variant: "outline",
        color: "warning",
        class:
          "bg-transparent text-warning border border-warning hover:bg-warning/10",
      },
      {
        variant: "outline",
        color: "neutral",
        class:
          "bg-transparent text-foreground border border-border hover:bg-secondary",
      },
      /* -------------------------------------------------------------------- */
      /* Text                                                                 */
      /* -------------------------------------------------------------------- */
      {
        variant: "text",
        color: "primary",
        class:
          "bg-transparent text-primary border border-transparent hover:bg-primary/10",
      },
      {
        variant: "text",
        color: "secondary",
        class:
          "bg-transparent text-foreground border border-transparent hover:bg-secondary",
      },
      {
        variant: "text",
        color: "danger",
        class:
          "bg-transparent text-destructive border border-transparent hover:bg-destructive/10",
      },
      {
        variant: "text",
        color: "success",
        class:
          "bg-transparent text-success border border-transparent hover:bg-success/10",
      },
      {
        variant: "text",
        color: "warning",
        class:
          "bg-transparent text-warning border border-transparent hover:bg-warning/10",
      },
      {
        variant: "text",
        color: "neutral",
        class:
          "bg-transparent text-foreground border border-transparent hover:bg-secondary",
      },
    ],
  },
);
/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      color = "primary",
      variant = "solid",
      size = "medium",
      isLoading = false,
      disabled = false,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          buttonVariants({
            color,
            variant,
            size,
          }),
          isLoading && "disabled:cursor-wait",
          className,
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
      >
        {isLoading && (
          <span
            aria-hidden="true"
            className="absolute size-4 animate-spin rounded-full border-2 border-current/25 border-t-current"
          />
        )}
        {startIcon && (
          <span className={cn(isLoading && "opacity-0")}>{startIcon}</span>
        )}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
        {endIcon && (
          <span className={cn(isLoading && "opacity-0")}>{endIcon}</span>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";
export default Button;
