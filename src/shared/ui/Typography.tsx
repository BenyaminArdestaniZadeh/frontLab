"use client";

import {
  CSSProperties,
  createElement,
  forwardRef,
  HTMLAttributes,
  JSX,
  ReactNode,
  useId,
} from "react";

import { cn } from "@/lib";
import { breakpoints } from "@/styles/breakpoints";

/* ---------------------------------- Types ---------------------------------- */

type BreakpointKeys = keyof typeof breakpoints;

type Responsive<T> = T | Partial<Record<BreakpointKeys, T>>;

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"
  | "span"
  | "p";

export interface TypographyProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "color"
> {
  variant?: TypographyVariant;

  as?: keyof JSX.IntrinsicElements;

  fontSize?: Responsive<string | number>;
  fontWeight?: Responsive<number | string>;
  lineHeight?: Responsive<string | number>;
  fontFamily?: Responsive<string>;
  color?: Responsive<string>;
  textAlign?: Responsive<CSSProperties["textAlign"]>;
  letterSpacing?: Responsive<string | number>;

  children: ReactNode;
}

/* ------------------------- Typography Style Props ------------------------- */

type TypographyStyleProps = Pick<
  TypographyProps,
  | "fontSize"
  | "fontWeight"
  | "lineHeight"
  | "fontFamily"
  | "color"
  | "textAlign"
  | "letterSpacing"
>;

/* --------------------------- Variant Defaults ----------------------------- */

const variantDefaults: Record<
  TypographyVariant,
  Pick<TypographyProps, "fontSize" | "fontWeight">
> = {
  h1: {
    fontSize: { mobile: 32, tablet: 40, desktop: 48 },
    fontWeight: 700,
  },

  h2: {
    fontSize: { mobile: 28, tablet: 32, desktop: 40 },
    fontWeight: 700,
  },

  h3: {
    fontSize: { mobile: 24, tablet: 28, desktop: 32 },
    fontWeight: 600,
  },

  h4: {
    fontSize: { mobile: 20, tablet: 24, desktop: 28 },
    fontWeight: 600,
  },

  h5: {
    fontSize: { mobile: 18, tablet: 20, desktop: 24 },
    fontWeight: 500,
  },

  h6: {
    fontSize: { mobile: 16, tablet: 18, desktop: 20 },
    fontWeight: 500,
  },

  body1: {
    fontSize: { mobile: 12, tablet: 14, desktop: 14 },
    fontWeight: 400,
  },

  body2: {
    fontSize: { mobile: 12, tablet: 12, desktop: 12 },
    fontWeight: 400,
  },

  caption: {
    fontSize: { mobile: 10, tablet: 12, desktop: 12 },
    fontWeight: 400,
  },

  span: {
    fontSize: { mobile: 14, tablet: 14, desktop: 14 },
    fontWeight: 400,
  },

  p: {
    fontSize: { mobile: 14, tablet: 16, desktop: 16 },
    fontWeight: 400,
  },
};

/* --------------------------- Semantic Elements ---------------------------- */

const defaultAsMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  span: "span",
  p: "p",
};

/* --------------------------- Responsive Styles ---------------------------- */

const typographyStyleMap = {
  fontSize: "font-size",
  fontWeight: "font-weight",
  lineHeight: "line-height",
  fontFamily: "font-family",
  color: "color",
  textAlign: "text-align",
  letterSpacing: "letter-spacing",
} as const;

const TYPOGRAPHY_STYLE_PROPS = new Set(Object.keys(typographyStyleMap));

const UNITLESS_CSS_PROPERTIES = new Set(["font-weight", "line-height"]);

function isResponsiveObject<T>(
  value: Responsive<T>,
): value is Partial<Record<BreakpointKeys, T>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatCssValue(property: string, value: string | number): string {
  if (typeof value === "number" && !UNITLESS_CSS_PROPERTIES.has(property)) {
    return `${value}px`;
  }

  return String(value);
}

function buildResponsiveStyles(
  props: TypographyStyleProps,
  selector: string,
): string {
  const baseStyles: string[] = [];

  const mediaStyles: Partial<Record<BreakpointKeys, string[]>> = {};

  for (const [prop, cssProperty] of Object.entries(typographyStyleMap) as [
    keyof typeof typographyStyleMap,
    (typeof typographyStyleMap)[keyof typeof typographyStyleMap],
  ][]) {
    const value = props[prop];

    if (value == null) continue;

    if (!isResponsiveObject(value)) {
      baseStyles.push(`${cssProperty}: ${formatCssValue(cssProperty, value)};`);

      continue;
    }

    for (const key of Object.keys(value) as BreakpointKeys[]) {
      const responsiveValue = value[key];

      if (responsiveValue == null) continue;

      const cssValue = `${cssProperty}: ${formatCssValue(
        cssProperty,
        responsiveValue,
      )};`;

      if (key === "mobile") {
        baseStyles.push(cssValue);
        continue;
      }

      if (!mediaStyles[key]) {
        mediaStyles[key] = [];
      }

      mediaStyles[key]!.push(cssValue);
    }
  }

  let styles = "";

  if (baseStyles.length > 0) {
    styles += `${selector} {
        ${baseStyles.join(" ")}
      }`;
  }

  for (const key of Object.keys(mediaStyles) as BreakpointKeys[]) {
    const breakpoint = breakpoints[key];
    const rules = mediaStyles[key];

    if (!breakpoint || !rules?.length) continue;

    styles += `
        @media (min-width: ${breakpoint}) {
          ${selector} {
            ${rules.join(" ")}
          }
        }
      `;
  }

  return styles;
}

/* ------------------------------ Component --------------------------------- */

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "span",
      as,
      fontSize,
      fontWeight,
      lineHeight,
      fontFamily,
      color,
      textAlign,
      letterSpacing,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const scopeClass = `fl-typography-${useId().replace(/:/g, "")}`;

    const defaults = variantDefaults[variant];

    const resolvedFontSize = fontSize ?? defaults.fontSize;

    const resolvedFontWeight = fontWeight ?? defaults.fontWeight;

    const element = as ?? defaultAsMap[variant];

    const typographyProps: TypographyStyleProps = {
      fontSize: resolvedFontSize,
      fontWeight: resolvedFontWeight,
      lineHeight,
      fontFamily,
      color,
      textAlign,
      letterSpacing,
    };

    const scopedStyles = buildResponsiveStyles(
      typographyProps,
      `.${scopeClass}`,
    );

    const domProps = {
      ...rest,
    } as HTMLAttributes<HTMLElement>;

    for (const prop of TYPOGRAPHY_STYLE_PROPS) {
      delete domProps[prop as keyof typeof domProps];
    }

    return (
      <>
        {scopedStyles && <style>{scopedStyles}</style>}

        {createElement(
          element,
          {
            ...domProps,
            ref,
            className: cn(scopeClass, className),
          },
          children,
        )}
      </>
    );
  },
);

Typography.displayName = "Typography";

export default Typography;
