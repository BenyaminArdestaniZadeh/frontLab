"use client";

import { CSSProperties, forwardRef, HTMLAttributes, useId } from "react";
import { cn } from "@/lib";
import { breakpoints } from "@/styles/breakpoints";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
type BreakpointKeys = keyof typeof breakpoints;

type Responsive<T> = T | Partial<Record<BreakpointKeys, T>>;
export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  display?: Responsive<CSSProperties["display"]>;
  width?: Responsive<string | number>;
  height?: Responsive<string | number>;
  maxWidth?: Responsive<string | number>;
  maxHeight?: Responsive<string | number>;
  minWidth?: Responsive<string | number>;
  minHeight?: Responsive<string | number>;
  flexDirection?: Responsive<CSSProperties["flexDirection"]>;
  alignItems?: Responsive<CSSProperties["alignItems"]>;
  justifyContent?: Responsive<CSSProperties["justifyContent"]>;
  gap?: Responsive<string | number>;
  flexWrap?: Responsive<CSSProperties["flexWrap"]>;
  margin?: Responsive<string | number>;
  marginTop?: Responsive<string | number>;
  marginBottom?: Responsive<string | number>;
  marginLeft?: Responsive<string | number>;
  marginRight?: Responsive<string | number>;
  padding?: Responsive<string | number>;
  paddingTop?: Responsive<string | number>;
  paddingBottom?: Responsive<string | number>;
  paddingLeft?: Responsive<string | number>;
  paddingRight?: Responsive<string | number>;
  position?: Responsive<CSSProperties["position"]>;
  top?: Responsive<string | number>;
  bottom?: Responsive<string | number>;
  left?: Responsive<string | number>;
  right?: Responsive<string | number>;
  zIndex?: Responsive<number | string>;
  border?: Responsive<string>;
  borderTop?: Responsive<string>;
  borderBottom?: Responsive<string>;
  borderLeft?: Responsive<string>;
  borderRight?: Responsive<string>;
  borderRadius?: Responsive<string | number>;
}
/* -------------------------------------------------------------------------- */
/*                              Responsive styles                             */
/* -------------------------------------------------------------------------- */
const responsiveStyleMap: Array<{
  prop: keyof FlexProps;
  cssProperty: string;
}> = [
  { prop: "display", cssProperty: "display" },
  { prop: "width", cssProperty: "width" },
  { prop: "height", cssProperty: "height" },
  { prop: "maxWidth", cssProperty: "max-width" },
  { prop: "maxHeight", cssProperty: "max-height" },
  { prop: "minWidth", cssProperty: "min-width" },
  { prop: "minHeight", cssProperty: "min-height" },
  { prop: "flexDirection", cssProperty: "flex-direction" },
  { prop: "alignItems", cssProperty: "align-items" },
  { prop: "justifyContent", cssProperty: "justify-content" },
  { prop: "gap", cssProperty: "gap" },
  { prop: "flexWrap", cssProperty: "flex-wrap" },
  { prop: "margin", cssProperty: "margin" },
  { prop: "marginTop", cssProperty: "margin-top" },
  { prop: "marginBottom", cssProperty: "margin-bottom" },
  { prop: "marginLeft", cssProperty: "margin-left" },
  { prop: "marginRight", cssProperty: "margin-right" },
  { prop: "padding", cssProperty: "padding" },
  { prop: "paddingTop", cssProperty: "padding-top" },
  { prop: "paddingBottom", cssProperty: "padding-bottom" },
  { prop: "paddingLeft", cssProperty: "padding-left" },
  { prop: "paddingRight", cssProperty: "padding-right" },
  { prop: "position", cssProperty: "position" },
  { prop: "top", cssProperty: "top" },
  { prop: "bottom", cssProperty: "bottom" },
  { prop: "left", cssProperty: "left" },
  { prop: "right", cssProperty: "right" },
  { prop: "zIndex", cssProperty: "z-index" },
  { prop: "border", cssProperty: "border" },
  { prop: "borderTop", cssProperty: "border-top" },
  { prop: "borderBottom", cssProperty: "border-bottom" },
  { prop: "borderLeft", cssProperty: "border-left" },
  { prop: "borderRight", cssProperty: "border-right" },
  { prop: "borderRadius", cssProperty: "border-radius" },
];

const FLEX_STYLE_PROPS = new Set<keyof FlexProps>(
  responsiveStyleMap.map(({ prop }) => prop),
);

const UNITLESS_CSS_PROPERTIES = new Set(["z-index"]);
/* -------------------------------------------------------------------------- */
/*                                CSS helpers                                 */
/* -------------------------------------------------------------------------- */
const formatCssValue = (
  cssProperty: string,
  value: string | number,
): string => {
  if (typeof value === "number") {
    return UNITLESS_CSS_PROPERTIES.has(cssProperty) ?
        String(value)
      : `${value}px`;
  }
  return value;
};

const isResponsiveObject = <T,>(
  value: Responsive<T>,
): value is Partial<Record<BreakpointKeys, T>> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
/* -------------------------------------------------------------------------- */
/*                           Responsive style builder                         */
/* -------------------------------------------------------------------------- */
const buildResponsiveStyles = (props: FlexProps, selector: string) => {
  const baseStyles: string[] = [];
  const mediaQueries = new Map<string, string[]>();
  responsiveStyleMap.forEach(({ prop, cssProperty }) => {
    const value = props[prop];
    if (value == null) {
      return;
    }
    if (!isResponsiveObject(value)) {
      baseStyles.push(
        `${cssProperty}: ${formatCssValue(cssProperty, value as string | number)};`,
      );
      return;
    }
    Object.entries(value).forEach(([breakpoint, breakpointValue]) => {
      if (breakpointValue == null) {
        return;
      }
      const declaration = `${cssProperty}: ${formatCssValue(
        cssProperty,
        breakpointValue as string | number,
      )};`;
      if (breakpoint === "mobile") {
        baseStyles.push(declaration);
        return;
      }
      const breakpointSize = breakpoints[breakpoint as BreakpointKeys];
      if (!breakpointSize) {
        return;
      }
      const existing = mediaQueries.get(breakpointSize) ?? [];
      existing.push(declaration);
      mediaQueries.set(breakpointSize, existing);
    });
  });
  const hasDisplay = baseStyles.some((rule) => rule.startsWith("display:"));
  if (!hasDisplay) {
    baseStyles.unshift("display:flex;");
  }
  const baseRule =
    baseStyles.length > 0 ? `${selector}{${baseStyles.join("")}}` : "";
  const mediaRules = Array.from(mediaQueries.entries())
    .map(
      ([minWidth, declarations]) =>
        `@media (min-width:${minWidth}){${selector}{${declarations.join("")}}}`,
    )
    .join("");
  return `${baseRule}${mediaRules}`;
};
/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const scopeClass = `fl-${useId().replace(/:/g, "")}`;
  const { children, style, className, ...rest } = props;
  const domProps = { ...rest } as HTMLAttributes<HTMLDivElement>;
  for (const prop of FLEX_STYLE_PROPS) {
    delete domProps[prop as keyof typeof domProps];
  }
  const scopedStyles = buildResponsiveStyles(props, `.${scopeClass}`);

  return (
    <div
      ref={ref}
      className={cn(scopeClass, className)}
      style={style}
      {...domProps}
    >
      {children}
      {scopedStyles && <style>{scopedStyles}</style>}
    </div>
  );
});

Flex.displayName = "Flex";

export default Flex;
