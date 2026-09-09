"use client";

import { CSSProperties, forwardRef, HTMLAttributes, useId } from "react";
import { cn } from "@/lib";
import { breakpoints } from "@/styles/breakpoints";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
type BreakpointKeys = keyof typeof breakpoints;

type Responsive<T> = T | Partial<Record<BreakpointKeys, T>>;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  display?: Responsive<CSSProperties["display"]>;
  width?: Responsive<string | number>;
  height?: Responsive<string | number>;
  maxWidth?: Responsive<string | number>;
  maxHeight?: Responsive<string | number>;
  minWidth?: Responsive<string | number>;
  minHeight?: Responsive<string | number>;
  columns?: Responsive<string | number>;
  gridTemplateRows?: Responsive<string>;
  gridTemplateAreas?: Responsive<string>;
  gridAutoColumns?: Responsive<string>;
  gridAutoRows?: Responsive<string>;
  gridAutoFlow?: Responsive<CSSProperties["gridAutoFlow"]>;
  gridColumn?: Responsive<string | number>;
  gridColumnStart?: Responsive<string | number>;
  gridColumnEnd?: Responsive<string | number>;
  gridRow?: Responsive<string | number>;
  gridRowStart?: Responsive<string | number>;
  gridRowEnd?: Responsive<string | number>;
  gap?: Responsive<string | number>;
  rowGap?: Responsive<string | number>;
  columnGap?: Responsive<string | number>;
  alignItems?: Responsive<CSSProperties["alignItems"]>;
  alignContent?: Responsive<CSSProperties["alignContent"]>;
  justifyItems?: Responsive<CSSProperties["justifyItems"]>;
  justifyContent?: Responsive<CSSProperties["justifyContent"]>;
  placeItems?: Responsive<CSSProperties["placeItems"]>;
  placeContent?: Responsive<CSSProperties["placeContent"]>;
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
  prop: keyof GridProps;
  cssProperty: string;
  formatValue?: (value: string | number) => string;
}> = [
  { prop: "display", cssProperty: "display" },
  { prop: "width", cssProperty: "width" },
  { prop: "height", cssProperty: "height" },
  { prop: "maxWidth", cssProperty: "max-width" },
  { prop: "maxHeight", cssProperty: "max-height" },
  { prop: "minWidth", cssProperty: "min-width" },
  { prop: "minHeight", cssProperty: "min-height" },
  {
    prop: "columns",
    cssProperty: "grid-template-columns",
    formatValue: (value) =>
      typeof value === "number" ? `repeat(${value}, minmax(0, 1fr))` : value,
  },
  {
    prop: "gridTemplateRows",
    cssProperty: "grid-template-rows",
  },
  {
    prop: "gridTemplateAreas",
    cssProperty: "grid-template-areas",
  },
  {
    prop: "gridAutoColumns",
    cssProperty: "grid-auto-columns",
  },
  {
    prop: "gridAutoRows",
    cssProperty: "grid-auto-rows",
  },
  {
    prop: "gridAutoFlow",
    cssProperty: "grid-auto-flow",
  },
  {
    prop: "gridColumn",
    cssProperty: "grid-column",
    formatValue: (value) => (typeof value === "number" ? String(value) : value),
  },
  {
    prop: "gridColumnStart",
    cssProperty: "grid-column-start",
    formatValue: (value) => (typeof value === "number" ? String(value) : value),
  },
  {
    prop: "gridColumnEnd",
    cssProperty: "grid-column-end",
    formatValue: (value) => (typeof value === "number" ? String(value) : value),
  },
  {
    prop: "gridRow",
    cssProperty: "grid-row",
    formatValue: (value) => (typeof value === "number" ? String(value) : value),
  },
  {
    prop: "gridRowStart",
    cssProperty: "grid-row-start",
    formatValue: (value) => (typeof value === "number" ? String(value) : value),
  },
  {
    prop: "gridRowEnd",
    cssProperty: "grid-row-end",
    formatValue: (value) => (typeof value === "number" ? String(value) : value),
  },
  { prop: "gap", cssProperty: "gap" },
  { prop: "rowGap", cssProperty: "row-gap" },
  { prop: "columnGap", cssProperty: "column-gap" },
  {
    prop: "alignItems",
    cssProperty: "align-items",
  },
  {
    prop: "alignContent",
    cssProperty: "align-content",
  },
  {
    prop: "justifyItems",
    cssProperty: "justify-items",
  },
  {
    prop: "justifyContent",
    cssProperty: "justify-content",
  },
  {
    prop: "placeItems",
    cssProperty: "place-items",
  },
  {
    prop: "placeContent",
    cssProperty: "place-content",
  },
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

const GRID_STYLE_PROPS = new Set<keyof GridProps>(
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

const toCssDeclaration = (
  cssProperty: string,
  value: string | number,
  formatValue?: (value: string | number) => string,
): string => {
  const formatter =
    formatValue ?? ((nextValue) => formatCssValue(cssProperty, nextValue));
  return `${cssProperty}: ${formatter(value)};`;
};
/* -------------------------------------------------------------------------- */
/*                           Responsive style builder                         */
/* -------------------------------------------------------------------------- */
const buildResponsiveStyles = (props: GridProps, selector: string) => {
  const baseStyles: string[] = [];
  const mediaQueries = new Map<string, string[]>();
  responsiveStyleMap.forEach(({ prop, cssProperty, formatValue }) => {
    const value = props[prop];
    if (value == null) {
      return;
    }
    if (!isResponsiveObject(value)) {
      baseStyles.push(toCssDeclaration(cssProperty, value, formatValue));
      return;
    }
    Object.entries(value).forEach(([breakpoint, breakpointValue]) => {
      if (breakpointValue == null) {
        return;
      }
      const declaration = toCssDeclaration(
        cssProperty,
        breakpointValue as string | number,
        formatValue,
      );
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
    baseStyles.unshift("display:grid;");
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
const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const scopeClass = `gr-${useId().replace(/:/g, "")}`;
  const { children, style, className, ...rest } = props;
  const domProps = { ...rest } as HTMLAttributes<HTMLDivElement>;
  for (const prop of GRID_STYLE_PROPS) {
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

Grid.displayName = "Grid";

export default Grid;
