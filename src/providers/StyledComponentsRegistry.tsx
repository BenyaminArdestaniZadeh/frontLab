"use client";
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [sheet] = useState(() => new ServerStyleSheet());

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
  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }
  /**
   * render
   * _______________________________________________________________________________
   */
  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
};
