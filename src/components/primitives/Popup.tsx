"use client";
import {
  forwardRef,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export interface PopupRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface PopupProps {
  direction: "left" | "right";
  trigger: ReactNode;
  children: ReactNode;
  closeOnSelect?: boolean;
  onBeforeOpen?: () => boolean;
  fullWidthTrigger?: boolean;
  flush?: boolean;
}
/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */
const POPUP_GAP = 8;
/* -------------------------------------------------------------------------- */
/*                                   Popup                                    */
/* -------------------------------------------------------------------------- */
export const Popup = forwardRef<PopupRef, PopupProps>(
  (
    {
      trigger,
      children,
      closeOnSelect = true,
      direction,
      onBeforeOpen,
      fullWidthTrigger = false,
      flush = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const [popupPosition, setPopupPosition] = useState<{
      top: number;
      left: number | undefined;
      right: number | undefined;
    }>({
      top: 0,
      left: undefined,
      right: 0,
    });

    const tryOpen = useCallback(() => {
      if (onBeforeOpen && !onBeforeOpen()) return false;
      setIsOpen(true);
      return true;
    }, [onBeforeOpen]);

    const close = useCallback(() => setIsOpen(false), []);

    const toggle = useCallback(() => {
      setIsOpen((prev) => {
        if (prev) return false;
        if (onBeforeOpen && !onBeforeOpen()) return false;
        return true;
      });
    }, [onBeforeOpen]);
    /* ------------------------------ Mounting ----------------------------- */
    useEffect(() => {
      setIsMounted(true);
    }, []);
    /* --------------------------- Imperative API -------------------------- */
    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          tryOpen();
        },
        close,
        toggle,
      }),
      [tryOpen, close, toggle],
    );
    /* --------------------------- Update Position ------------------------- */
    const updatePosition = useCallback(() => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const popupEl = popupRef.current;
      const popupHeight = popupEl?.offsetHeight ?? 0;
      const popupWidth = popupEl?.offsetWidth ?? 0;
      let top = rect.bottom + POPUP_GAP;
      if (
        popupHeight > 0 &&
        top + popupHeight > window.innerHeight - POPUP_GAP
      ) {
        top = Math.max(POPUP_GAP, rect.top - POPUP_GAP - popupHeight);
      }

      if (direction === "right") {
        let left = rect.left;
        if (
          popupWidth > 0 &&
          left + popupWidth > window.innerWidth - POPUP_GAP
        ) {
          left = Math.max(
            POPUP_GAP,
            window.innerWidth - popupWidth - POPUP_GAP,
          );
        }

        setPopupPosition({
          top,
          left,
          right: undefined,
        });
        return;
      }

      let right = Math.max(0, window.innerWidth - rect.right);
      if (
        popupWidth > 0 &&
        window.innerWidth - right - popupWidth < POPUP_GAP
      ) {
        right = Math.max(POPUP_GAP, window.innerWidth - popupWidth - POPUP_GAP);
      }

      setPopupPosition({
        top,
        left: undefined,
        right,
      });
    }, [direction]);
    /* ------------------------- Position Tracking ------------------------- */
    useLayoutEffect(() => {
      if (!isOpen) return;
      updatePosition();
      const rafId = requestAnimationFrame(updatePosition);
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [isOpen, updatePosition]);
    /* ----------------------------- Escape Key ---------------------------- */
    useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          close();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, close]);
    /* -------------------------- Click Outside ---------------------------- */
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          wrapperRef.current?.contains(target) ||
          popupRef.current?.contains(target)
        ) {
          return;
        }
        close();
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, close]);
    /* -------------------------- Inside Click ------------------------------ */
    const handleInsideClick = (event: ReactMouseEvent) => {
      if (closeOnSelect) {
        close();
      }
      event.stopPropagation();
    };

    const handleTriggerClick = (event: ReactMouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      toggle();
    };

    const handleTriggerKeyDown = (event: ReactKeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        toggle();
      }
    };
    /* --------------------------- Popup Content ---------------------------- */
    const popupNode =
      isOpen && isMounted ?
        <div
          ref={popupRef}
          role="menu"
          onClick={handleInsideClick}
          style={{
            top: popupPosition.top,
            ...(popupPosition.left !== undefined ?
              { left: popupPosition.left }
            : {}),
            ...(popupPosition.right !== undefined ?
              { right: popupPosition.right }
            : {}),
          }}
          className={cn(
            "fixed z-99999",
            "min-w-[200px]",
            "max-w-[calc(100vw-16px)]",
            "overflow-hidden",
            "bg-background",
            flush ? "rounded-2xl p-0" : "rounded-xl p-4",
            "shadow-[0_8px_24px_rgba(0,0,0,0.15)]",
          )}
        >
          {children}
        </div>
      : null;
    /* ------------------------------ Trigger ------------------------------- */
    return (
      <div
        ref={wrapperRef}
        className={cn(
          "relative z-20",
          fullWidthTrigger ? "block w-full" : "inline-block w-auto",
        )}
      >
        <div
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="cursor-pointer"
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
        >
          {trigger}
        </div>
        {popupNode && createPortal(popupNode, document.body)}
      </div>
    );
  },
);
Popup.displayName = "Popup";

export default Popup;
