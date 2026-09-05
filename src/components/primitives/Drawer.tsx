"use client";

import {
  forwardRef,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib";
import Close from "@/public/icon/Close";
import { breakpoints } from "@/styles/breakpoints";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slideDirection?: "left" | "right" | "up" | "down";
  isFullHeight?: boolean;
  children: ReactNode;
  animationDuration?: number;
  title?: string;
}
/* -------------------------------------------------------------------------- */
/*                              Drawer Component                              */
/* -------------------------------------------------------------------------- */
const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      slideDirection = "down",
      isFullHeight = false,
      children,
      animationDuration = 300,
      title,
    },
    ref,
  ) => {
    const titleId = useId();
    const [isMounted, setIsMounted] = useState(false);
    const [closing, setClosing] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const closingRef = useRef(false);
    const isActive = isOpen && isMobileOrTablet;
    /* --------------------- Mobile / Tablet viewport only -------------------- */
    useEffect(() => {
      const mediaQuery = window.matchMedia(
        `(max-width: ${Number.parseInt(breakpoints.laptop, 10) - 1}px)`,
      );
      const updateMatch = () => setIsMobileOrTablet(mediaQuery.matches);
      updateMatch();
      mediaQuery.addEventListener("change", updateMatch);
      return () => mediaQuery.removeEventListener("change", updateMatch);
    }, []);
    /* ------------------------ Escape Key Handler ------------------------ */
    useEffect(() => {
      if (!isActive && !closing) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isActive, closing, onClose]);
    /* ---------------------------- Scroll Lock --------------------------- */
    useEffect(() => {
      if (!isMounted || !isMobileOrTablet) return;
      const body = document.body;
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.overflow = "hidden";
      body.dataset.scrollY = String(scrollY);
      return () => {
        const savedY =
          body.dataset.scrollY ? Number.parseInt(body.dataset.scrollY, 10) : 0;
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.overflow = "";
        body.removeAttribute("data-scroll-y");
        window.scrollTo(0, savedY);
      };
    }, [isMounted, isMobileOrTablet]);
    /* ------------------------ Open / Close Animation -------------------- */
    useEffect(() => {
      if (isActive) {
        setIsMounted(true);
        setClosing(false);
        closingRef.current = false;
        return;
      }
      if (isMounted && !closingRef.current) {
        setClosing(true);
        closingRef.current = true;
        const timer = setTimeout(() => {
          setIsMounted(false);
          setClosing(false);
          closingRef.current = false;
        }, animationDuration);
        return () => clearTimeout(timer);
      }
    }, [isActive, animationDuration, isMounted]);
    /* --------------------------- Conditional Render --------------------- */
    if (!isMounted || !isMobileOrTablet) return null;
    /* ---------------------------- Portal Rendering ---------------------- */
    return createPortal(
      <>
        <div
          onClick={() => !closing && onClose()}
          aria-hidden="true"
          className={cn("fixed inset-0 z-999", "bg-black/40")}
          style={{
            animationDuration: `${animationDuration}ms`,
            animationTimingFunction: "ease",
            animationFillMode: "forwards",
            animationName: closing ? "drawerFadeOut" : "drawerFadeIn",
          }}
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          onClick={(event) => event.stopPropagation()}
          className={cn(
            "fixed z-1000",
            "flex min-h-0 flex-col",
            "bg-background",
            slideDirection === "left" && [
              "left-0 top-0",
              "h-dvh",
              "w-[min(100vw,320px)]",
            ],
            slideDirection === "right" && [
              "right-0 top-0",
              "h-dvh",
              "w-[min(100vw,320px)]",
            ],
            slideDirection === "up" && ["left-0 top-0", "w-screen"],
            slideDirection === "down" && [
              "bottom-0 left-0",
              "w-screen",
              isFullHeight ? "h-dvh" : "h-auto",
            ],
          )}
          style={{
            animationDuration: `${animationDuration}ms`,
            animationTimingFunction: "ease",
            animationFillMode: "forwards",
            animationName:
              closing ?
                `drawerSlideOut-${slideDirection}`
              : `drawerSlideIn-${slideDirection}`,
          }}
        >
          {slideDirection === "down" && title && (
            <div
              className={cn(
                "sticky top-0",
                "flex items-center justify-between",
                "px-4 py-3",
                "bg-primary",
                "rounded-b",
              )}
            >
              <span
                id={titleId}
                className={cn("text-base font-medium", "text-white")}
              >
                {title}
              </span>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center",
                  "cursor-pointer",
                  "rounded-md",
                  "border border-white/30",
                  "bg-white/20",
                  "text-white",
                  "transition-colors",
                  "hover:bg-white/30",
                )}
              >
                <Close />
              </button>
            </div>
          )}
          <div
            className={cn(
              "w-full",
              "min-h-0",
              "flex-1",
              "overflow-y-auto",
              "overflow-x-hidden",
              "[-webkit-overflow-scrolling:touch]",
            )}
          >
            {children}
          </div>
        </div>
      </>,
      document.body,
    );
  },
);

Drawer.displayName = "Drawer";

export default Drawer;
