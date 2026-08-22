"use client";

import React, { forwardRef, ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";
/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
export type IconButtonColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "neutral";
export type IconButtonVariant = "solid" | "soft" | "outline" | "text";
export type IconButtonSize = "small" | "medium" | "large";
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: IconButtonColor;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  "aria-label": string;
}
/* -------------------------------------------------------------------------- */
/* Size                                                                       */
/* -------------------------------------------------------------------------- */
const sizeStyles: Record<IconButtonSize, ReturnType<typeof css>> = {
  small: css`
    width: 32px;
    height: 32px;
    svg {
      width: 16px;
      height: 16px;
    }
  `,

  medium: css`
    width: 40px;
    height: 40px;
    svg {
      width: 20px;
      height: 20px;
    }
  `,

  large: css`
    width: 48px;
    height: 48px;
    svg {
      width: 24px;
      height: 24px;
    }
  `,
};

/* -------------------------------------------------------------------------- */
/* Spinner                                                                    */
/* -------------------------------------------------------------------------- */
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
/* -------------------------------------------------------------------------- */
/* Color Tokens                                                               */
/* -------------------------------------------------------------------------- */
const colorTokens = {
  primary: {
    solid: {
      background: "var(--primary)",
      color: "var(--white)",
      border: "var(--primary)",
    },
    soft: "var(--primary)",
    outline: "var(--primary)",
    text: "var(--primary)",
  },

  secondary: {
    solid: {
      background: "var(--secondary)",
      color: "var(--foreground)",
      border: "var(--secondary)",
    },
    soft: "var(--secondary)",
    outline: "var(--border)",
    text: "var(--foreground)",
  },

  danger: {
    solid: {
      background: "var(--destructive)",
      color: "var(--white)",
      border: "var(--destructive)",
    },
    soft: "var(--destructive)",
    outline: "var(--destructive)",
    text: "var(--destructive)",
  },

  success: {
    solid: {
      background: "var(--success)",
      color: "var(--white)",
      border: "var(--success)",
    },
    soft: "var(--success)",
    outline: "var(--success)",
    text: "var(--success)",
  },

  warning: {
    solid: {
      background: "var(--warning)",
      color: "var(--black)",
      border: "var(--warning)",
    },
    soft: "var(--warning)",
    outline: "var(--warning)",
    text: "var(--warning)",
  },

  neutral: {
    solid: {
      background: "var(--foreground)",
      color: "var(--background)",
      border: "var(--foreground)",
    },
    soft: "var(--foreground)",
    outline: "var(--foreground)",
    text: "var(--foreground)",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Variant Styles                                                             */
/* -------------------------------------------------------------------------- */

const variantStyle = (color: IconButtonColor, variant: IconButtonVariant) => {
  const token = colorTokens[color];
  switch (variant) {
    case "solid":
      return css`
        background: ${token.solid.background};
        color: ${token.solid.color};
        border: 1px solid ${token.solid.border};
        &:hover:not(:disabled) {
          filter: brightness(0.94);
        }
        &:active:not(:disabled) {
          filter: brightness(0.88);
        }
      `;

    case "soft":
      return css`
        background: color-mix(in srgb, ${token.soft} 12%, var(--background));
        color: ${token.soft};
        border: 1px solid transparent;
        &:hover:not(:disabled) {
          background: color-mix(in srgb, ${token.soft} 18%, var(--background));
        }
      `;

    case "outline":
      return css`
        background: transparent;
        color: ${token.outline};
        border: 1px solid ${token.outline};
        &:hover:not(:disabled) {
          background: color-mix(
            in srgb,
            ${token.outline} 8%,
            var(--background)
          );
        }
      `;

    case "text":
      return css`
        background: transparent;
        color: ${token.text};
        border: 1px solid transparent;
        &:hover:not(:disabled) {
          background: color-mix(in srgb, ${token.text} 8%, var(--background));
        }
      `;
  }
};
/* -------------------------------------------------------------------------- */
/* Styled Component                                                           */
/* -------------------------------------------------------------------------- */
interface StyledIconButtonProps {
  $size: IconButtonSize;
  $color: IconButtonColor;
  $variant: IconButtonVariant;
  $isLoading: boolean;
}
const SIconButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$color", "$variant", "$isLoading"].includes(prop),
})<StyledIconButtonProps>`
  all: unset;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    filter 0.2s ease;
  ${({ $size }) => sizeStyles[$size]}
  ${({ $color, $variant }) => variantStyle($color, $variant)}
  /* Icon */
  svg {
    display: block;
    flex-shrink: 0;
  }
  /* Focus */
  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  /* Disabled */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  /* Loading */
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      color: transparent;
      pointer-events: none;
      svg {
        visibility: hidden;
      }
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        margin: auto;
        width: 16px;
        height: 16px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: ${spin} 0.6s linear infinite;
      }
    `}
`;
/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      color = "primary",
      variant = "solid",
      size = "medium",
      isLoading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <SIconButton
        ref={ref}
        {...props}
        $color={color}
        $variant={variant}
        $size={size}
        $isLoading={isLoading}
        disabled={isLoading || disabled}
      >
        {children}
      </SIconButton>
    );
  },
);
IconButton.displayName = "IconButton";
export default IconButton;
