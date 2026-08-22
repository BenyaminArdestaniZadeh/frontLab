"use client";
import { useTheme } from "next-themes";
import { Button } from "./primitives";

/**
 * props and types
 * _______________________________________________________________________________
 */

export const ThemeToggle = () => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { theme, resolvedTheme, setTheme } = useTheme();
  /**
   * services
   * _______________________________________________________________________________
   */
  /**
   * useEffect
   * _______________________________________________________________________________
   */
  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  /**
   * render
   * _______________________________________________________________________________
   */
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "16px 24px",
        gap: "24px",
      }}
    >
      <Button color={"danger"} onClick={() => setTheme("light")}>
        light
      </Button>
      <Button onClick={() => setTheme("dark")}>dark</Button>
    </div>
  );
};
