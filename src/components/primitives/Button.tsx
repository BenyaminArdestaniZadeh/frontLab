"use client";

import { breakpoints } from "@/styles";
import React, { forwardRef } from "react";
import styled, { css, keyframes } from "styled-components";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
type Breakpoint = keyof typeof breakpoints;
export type ButtonColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "neutral";
export type ButtonVariant = "solid" | "soft" | "outline" | "text";
export type ButtonSize = "small" | "medium" | "large";
export type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>;
export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  color?: ResponsiveProp<ButtonColor>;
  variant?: ResponsiveProp<ButtonVariant>;
  size?: ResponsiveProp<ButtonSize>;
  width?: ResponsiveProp<string | number>;
  minWidth?: ResponsiveProp<string | number>;
  maxWidth?: ResponsiveProp<string | number>;
  display?: ResponsiveProp<React.CSSProperties["display"]>;
  isLoading?: boolean;
}
/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */
const toCssValue = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;

const responsiveStyle = <T extends string | number>(
  value: ResponsiveProp<T> | undefined,
  property: string,
) => {
  if (value == null) return "";
  if (typeof value !== "object") {
    return `${property}: ${toCssValue(value)};`;
  }
  return Object.entries(value)
    .filter(([, item]) => item != null)
    .map(([breakpoint, item]) => {
      if (breakpoint === "mobile") {
        return `${property}: ${toCssValue(item)};`;
      }
      return `
        @media (min-width: ${breakpoints[breakpoint as Breakpoint]}) {
          ${property}: ${toCssValue(item)};
        }
      `;
    })
    .join("\n");
};

/* -------------------------------------------------------------------------- */
/* Size                                                                       */
/* -------------------------------------------------------------------------- */

const sizeStyle = (size: ButtonSize) => {
  switch (size) {
    case "small":
      return css`
        min-width: 72px;
        height: 32px;
        padding-inline: 12px;
        font-size: 12px;
        border-radius: 6px;
      `;

    case "large":
      return css`
        min-width: 132px;
        height: 48px;
        padding-inline: 24px;
        font-size: 16px;
        border-radius: 8px;
      `;

    case "medium":
    default:
      return css`
        min-width: 100px;
        height: 40px;
        padding-inline: 16px;
        font-size: 14px;
        border-radius: 8px;
      `;
  }
};

const responsiveSizeStyle = (size: ResponsiveProp<ButtonSize>) => {
  if (typeof size !== "object") {
    return sizeStyle(size);
  }

  return Object.entries(size)
    .filter(([, value]) => value != null)
    .map(([breakpoint, value]) => {
      const styles = sizeStyle(value);
      if (breakpoint === "mobile") {
        return styles;
      }
      return `
        @media (min-width: ${breakpoints[breakpoint as Breakpoint]}) {
          ${styles}
        }
      `;
    })
    .join("\n");
};

/* -------------------------------------------------------------------------- */
/* Color / Variant                                                             */
/* -------------------------------------------------------------------------- */

const colorVariantStyle = (color: ButtonColor, variant: ButtonVariant) => {
  switch (variant) {
    case "solid":
      switch (color) {
        case "primary":
          return css`
            background: var(--primary);
            color: var(--white);
            border: 1px solid var(--primary);
            &:hover:not(:disabled) {
              filter: brightness(0.94);
            }
            &:active:not(:disabled) {
              filter: brightness(0.88);
            }
          `;

        case "secondary":
          return css`
            background: var(--secondary);
            color: var(--foreground);
            border: 1px solid var(--secondary);
            &:hover:not(:disabled) {
              filter: brightness(0.96);
            }
            &:active:not(:disabled) {
              filter: brightness(0.92);
            }
          `;

        case "danger":
          return css`
            background: var(--destructive);
            color: var(--white);
            border: 1px solid var(--destructive);
            &:hover:not(:disabled) {
              filter: brightness(0.94);
            }
            &:active:not(:disabled) {
              filter: brightness(0.88);
            }
          `;

        case "success":
          return css`
            background: var(--success);
            color: var(--white);
            border: 1px solid var(--success);
            &:hover:not(:disabled) {
              filter: brightness(0.94);
            }
            &:active:not(:disabled) {
              filter: brightness(0.88);
            }
          `;

        case "warning":
          return css`
            background: var(--warning);
            color: var(--black);
            border: 1px solid var(--warning);
            &:hover:not(:disabled) {
              filter: brightness(0.94);
            }
            &:active:not(:disabled) {
              filter: brightness(0.88);
            }
          `;

        case "neutral":
          return css`
            background: var(--foreground);
            color: var(--background);
            border: 1px solid var(--foreground);
            &:hover:not(:disabled) {
              opacity: 0.9;
            }
            &:active:not(:disabled) {
              opacity: 0.82;
            }
          `;
      }
      break;

    case "soft":
      switch (color) {
        case "primary":
          return css`
            background: color-mix(
              in srgb,
              var(--primary) 12%,
              var(--background)
            );
            color: var(--primary);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--primary) 18%,
                var(--background)
              );
            }
          `;

        case "secondary":
          return css`
            background: var(--muted);
            color: var(--foreground);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--muted) 85%,
                var(--foreground)
              );
            }
          `;

        case "danger":
          return css`
            background: color-mix(
              in srgb,
              var(--destructive) 12%,
              var(--background)
            );
            color: var(--destructive);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--destructive) 18%,
                var(--background)
              );
            }
          `;

        case "success":
          return css`
            background: color-mix(
              in srgb,
              var(--success) 12%,
              var(--background)
            );
            color: var(--success);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--success) 18%,
                var(--background)
              );
            }
          `;

        case "warning":
          return css`
            background: color-mix(
              in srgb,
              var(--warning) 12%,
              var(--background)
            );
            color: var(--warning);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--warning) 18%,
                var(--background)
              );
            }
          `;

        case "neutral":
          return css`
            background: var(--muted);
            color: var(--foreground);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--muted) 80%,
                var(--foreground)
              );
            }
          `;
      }
      break;

    case "outline":
      switch (color) {
        case "primary":
          return css`
            background: transparent;
            color: var(--primary);
            border: 1px solid var(--primary);
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--primary) 8%,
                var(--background)
              );
            }
          `;

        case "secondary":
          return css`
            background: transparent;
            color: var(--foreground);
            border: 1px solid var(--border);
            &:hover:not(:disabled) {
              background: var(--secondary);
            }
          `;

        case "danger":
          return css`
            background: transparent;
            color: var(--destructive);
            border: 1px solid var(--destructive);
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--destructive) 8%,
                var(--background)
              );
            }
          `;

        case "success":
          return css`
            background: transparent;
            color: var(--success);
            border: 1px solid var(--success);
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--success) 8%,
                var(--background)
              );
            }
          `;

        case "warning":
          return css`
            background: transparent;
            color: var(--warning);
            border: 1px solid var(--warning);
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--warning) 8%,
                var(--background)
              );
            }
          `;

        case "neutral":
          return css`
            background: transparent;
            color: var(--foreground);
            border: 1px solid var(--border);
            &:hover:not(:disabled) {
              background: var(--muted);
            }
          `;
      }
      break;

    case "text":
      switch (color) {
        case "primary":
          return css`
            background: transparent;
            color: var(--primary);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--primary) 8%,
                var(--background)
              );
            }
          `;

        case "secondary":
          return css`
            background: transparent;
            color: var(--foreground);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: var(--muted);
            }
          `;

        case "danger":
          return css`
            background: transparent;
            color: var(--destructive);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--destructive) 8%,
                var(--background)
              );
            }
          `;

        case "success":
          return css`
            background: transparent;
            color: var(--success);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--success) 8%,
                var(--background)
              );
            }
          `;

        case "warning":
          return css`
            background: transparent;
            color: var(--warning);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: color-mix(
                in srgb,
                var(--warning) 8%,
                var(--background)
              );
            }
          `;

        case "neutral":
          return css`
            background: transparent;
            color: var(--foreground);
            border: 1px solid transparent;
            &:hover:not(:disabled) {
              background: var(--muted);
            }
          `;
      }
      break;
  }
};

/* -------------------------------------------------------------------------- */
/* Loading                                                                     */
/* -------------------------------------------------------------------------- */
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
/* -------------------------------------------------------------------------- */
/* Styled Button                                                              */
/* -------------------------------------------------------------------------- */

interface StyledButtonProps {
  $color: ResponsiveProp<ButtonColor>;
  $variant: ResponsiveProp<ButtonVariant>;
  $size: ResponsiveProp<ButtonSize>;
  $width?: ResponsiveProp<string | number>;
  $minWidth?: ResponsiveProp<string | number>;
  $maxWidth?: ResponsiveProp<string | number>;
  $display?: ResponsiveProp<React.CSSProperties["display"]>;
  $isLoading: boolean;
}

const SButton = styled.button<StyledButtonProps>`
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  font-family: inherit;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    opacity 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  ${({ $width }) => responsiveStyle($width, "width")}
  ${({ $minWidth }) => responsiveStyle($minWidth, "min-width")}
  ${({ $maxWidth }) => responsiveStyle($maxWidth, "max-width")}
  ${({ $display }) => responsiveStyle($display, "display")}
  ${({ $size }) => responsiveSizeStyle($size)}
  ${({ $color, $variant }) => {
    if (typeof $color !== "object" && typeof $variant !== "object") {
      return colorVariantStyle($color, $variant);
    }
    const points = new Set<Breakpoint>();
    if (typeof $color === "object") {
      Object.keys($color).forEach((point) => points.add(point as Breakpoint));
    }
    if (typeof $variant === "object") {
      Object.keys($variant).forEach((point) => points.add(point as Breakpoint));
    }
    const baseColor =
      typeof $color === "object" ?
        ($color.mobile ?? Object.values($color)[0] ?? "primary")
      : $color;
    const baseVariant =
      typeof $variant === "object" ?
        ($variant.mobile ?? Object.values($variant)[0] ?? "solid")
      : $variant;
    const styles = [colorVariantStyle(baseColor, baseVariant)];
    points.delete("mobile");
    points.forEach((point) => {
      const color =
        typeof $color === "object" ? ($color[point] ?? baseColor) : $color;
      const variant =
        typeof $variant === "object" ?
          ($variant[point] ?? baseVariant)
        : $variant;
      styles.push(css`
        @media (min-width: ${breakpoints[point]}) {
          ${colorVariantStyle(color, variant)}
        }
      `);
    });
    return styles;
  }}
  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      pointer-events: none;
      cursor: wait;
      & > * {
        opacity: 0;
      }
    `}

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin-top: -8px;
    margin-left: -8px;
    border: 2px solid color-mix(in srgb, currentColor 25%, transparent);
    border-top-color: currentColor;
    border-radius: 50%;
    animation: ${spin} 600ms linear infinite;
    opacity: ${({ $isLoading }) => ($isLoading ? 1 : 0)};
    visibility: ${({ $isLoading }) => ($isLoading ? "visible" : "hidden")};
  }
`;
/* -------------------------------------------------------------------------- */
/* Public Component                                                           */
/* -------------------------------------------------------------------------- */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = "primary",
      variant = "solid",
      size = "medium",
      width,
      minWidth,
      maxWidth,
      display,
      isLoading = false,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <SButton
        ref={ref}
        {...rest}
        $color={color}
        $variant={variant}
        $size={size}
        $width={width}
        $minWidth={minWidth}
        $maxWidth={maxWidth}
        $display={display}
        $isLoading={isLoading}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
      >
        {children}
      </SButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
