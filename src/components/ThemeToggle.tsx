"use client";
import { useTheme } from "next-themes";

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
    // <div className="p-8 bg-blue-500 text-black">
    //   <button
    //     className="bg-primary text-primary-foreground p-2 rounded-md"
    //     onClick={() => setTheme("light")}
    //   >
    //     Light
    //   </button>
    //   <button onClick={() => setTheme("dark")}>Dark</button>
    // </div>

    // <div className="flex gap-2 bg-red-500 p-8 text-white">
    //   <div className="size-10 bg-blue-500" />
    //   <div className="size-10 bg-green-500" />
    // </div>
    <div className="w-full flex gap-2 bg-red-500 p-8 text-white">
      <div className="size-10 bg-blue-500" />
      <div className="size-10 bg-green-500" />
    </div>
  );
};
