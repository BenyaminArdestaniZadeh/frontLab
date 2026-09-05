"use client";

import { CSSProperties, forwardRef, HTMLAttributes, useId } from "react";
import { cn } from "@/lib";
import { breakpoints } from "@/styles/breakpoints";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
type BreakpointKeys = keyof typeof breakpoints;

type Responsive<T> = T | Partial<Record<BreakpointKeys, T>>;

export interface BoxProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  display?: Responsive<CSSProperties["display"]>;
  width?: Responsive<string | number>;
  height?: Responsive<string | number>;
  maxWidth?: Responsive<string | number>;
  maxHeight?: Responsive<string | number>;
  minWidth?: Responsive<string | number>;
  minHeight?: Responsive<string | number>;
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
  overflow?: Responsive<CSSProperties["overflow"]>;
  overflowX?: Responsive<CSSProperties["overflowX"]>;
  overflowY?: Responsive<CSSProperties["overflowY"]>;
  background?: Responsive<string>;
  backgroundColor?: Responsive<string>;
  border?: Responsive<string>;
  borderTop?: Responsive<string>;
  borderBottom?: Responsive<string>;
  borderLeft?: Responsive<string>;
  borderRight?: Responsive<string>;
  borderRadius?: Responsive<string | number>;
  boxShadow?: Responsive<string>;
  opacity?: Responsive<number | string>;
  visibility?: Responsive<CSSProperties["visibility"]>;
  cursor?: Responsive<CSSProperties["cursor"]>;
  color?: Responsive<string>;
  textAlign?: Responsive<CSSProperties["textAlign"]>;
  transform?: Responsive<string>;
  transition?: Responsive<string>;
}
/* -------------------------------------------------------------------------- */
/*                              Responsive styles                             */
/* -------------------------------------------------------------------------- */
const responsiveStyleMap: Array<{
  prop: keyof BoxProps;
  cssProperty: string;
}> = [
  { prop: "display", cssProperty: "display" },
  { prop: "width", cssProperty: "width" },
  { prop: "height", cssProperty: "height" },
  { prop: "maxWidth", cssProperty: "max-width" },
  { prop: "maxHeight", cssProperty: "max-height" },
  { prop: "minWidth", cssProperty: "min-width" },
  { prop: "minHeight", cssProperty: "min-height" },
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
  { prop: "overflow", cssProperty: "overflow" },
  { prop: "overflowX", cssProperty: "overflow-x" },
  { prop: "overflowY", cssProperty: "overflow-y" },
  { prop: "background", cssProperty: "background" },
  {
    prop: "backgroundColor",
    cssProperty: "background-color",
  },
  { prop: "border", cssProperty: "border" },
  { prop: "borderTop", cssProperty: "border-top" },
  { prop: "borderBottom", cssProperty: "border-bottom" },
  { prop: "borderLeft", cssProperty: "border-left" },
  { prop: "borderRight", cssProperty: "border-right" },
  { prop: "borderRadius", cssProperty: "border-radius" },
  { prop: "boxShadow", cssProperty: "box-shadow" },
  { prop: "opacity", cssProperty: "opacity" },
  { prop: "visibility", cssProperty: "visibility" },
  { prop: "cursor", cssProperty: "cursor" },
  { prop: "color", cssProperty: "color" },
  { prop: "textAlign", cssProperty: "text-align" },
  { prop: "transform", cssProperty: "transform" },
  { prop: "transition", cssProperty: "transition" },
];

const BOX_STYLE_PROPS = new Set<keyof BoxProps>(
  responsiveStyleMap.map(({ prop }) => prop),
);

const UNITLESS_CSS_PROPERTIES = new Set(["z-index", "opacity"]);
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
const buildResponsiveStyles = (props: BoxProps, selector: string) => {
  const baseStyles: string[] = [];
  const mediaQueries = new Map<string, string[]>();
  responsiveStyleMap.forEach(({ prop, cssProperty }) => {
    const value = props[prop];
    if (value == null) {
      return;
    }
    if (!isResponsiveObject(value)) {
      baseStyles.push(
        `${cssProperty}: ${formatCssValue(
          cssProperty,
          value as string | number,
        )};`,
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
const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const scopeClass = `bx-${useId().replace(/:/g, "")}`;
  const { children, style, className, ...rest } = props;
  const domProps = { ...rest } as HTMLAttributes<HTMLDivElement>;
  for (const prop of BOX_STYLE_PROPS) {
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
      {scopedStyles ?
        <style>{scopedStyles}</style>
      : null}
    </div>
  );
});

Box.displayName = "Box";

export default Box;
