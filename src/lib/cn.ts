import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates responsive CSS styles from a responsive prop.
 *
 * Accepts either a single value or breakpoint-based values and
 * converts them into the corresponding CSS property declarations.
 *
 * Used for component props such as width, minWidth, maxWidth, and display
 * that need to support responsive values across different breakpoints.
 */
