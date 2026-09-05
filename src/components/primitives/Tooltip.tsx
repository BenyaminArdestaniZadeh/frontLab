"use client";

import {
  cloneElement,
  FocusEvent as ReactFocusEvent,
  isValidElement,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type TriggerProps = {
  onMouseEnter?: (event: ReactMouseEvent) => void;
  onMouseLeave?: (event: ReactMouseEvent) => void;
  onFocus?: (event: ReactFocusEvent) => void;
  onBlur?: (event: ReactFocusEvent) => void;
  "aria-describedby"?: string;
};

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement<TriggerProps>;
  side?: "top" | "right" | "bottom" | "left";
  disabled?: boolean;
  className?: string;
}

const TOOLTIP_GAP = 8;
const emptySubscribe = () => () => {};

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

const Tooltip = ({
  content,
  children,
  side = "top",
  disabled = false,
  className,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const tooltipWidth = tooltip?.offsetWidth ?? 0;
      const tooltipHeight = tooltip?.offsetHeight ?? 0;

      let top = 0;
      let left = 0;

      switch (side) {
        case "right":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.right + TOOLTIP_GAP;
          break;
        case "bottom":
          top = rect.bottom + TOOLTIP_GAP;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.left - TOOLTIP_GAP - tooltipWidth;
          break;
        case "top":
        default:
          top = rect.top - TOOLTIP_GAP - tooltipHeight;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
      }

      const maxLeft = window.innerWidth - tooltipWidth - TOOLTIP_GAP;
      const maxTop = window.innerHeight - tooltipHeight - TOOLTIP_GAP;

      setPosition({
        top: Math.min(
          Math.max(TOOLTIP_GAP, top),
          Math.max(TOOLTIP_GAP, maxTop),
        ),
        left: Math.min(
          Math.max(TOOLTIP_GAP, left),
          Math.max(TOOLTIP_GAP, maxLeft),
        ),
      });
    };

    updatePosition();
    const rafId = requestAnimationFrame(updatePosition);

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, side, content]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (disabled || content == null || content === false || content === "") {
    return children;
  }

  if (!isValidElement(children)) {
    return null;
  }

  const child = cloneElement(children, {
    onMouseEnter: (event: ReactMouseEvent) => {
      children.props.onMouseEnter?.(event);
      setIsOpen(true);
    },
    onMouseLeave: (event: ReactMouseEvent) => {
      children.props.onMouseLeave?.(event);
      setIsOpen(false);
    },
    onFocus: (event: ReactFocusEvent) => {
      children.props.onFocus?.(event);
      setIsOpen(true);
    },
    onBlur: (event: ReactFocusEvent) => {
      children.props.onBlur?.(event);
      setIsOpen(false);
    },
    "aria-describedby": isOpen ? id : undefined,
  });

  return (
    <span ref={triggerRef} className="relative inline-flex ">
      {child}

      {isOpen &&
        isClient &&
        createPortal(
          <span
            ref={tooltipRef}
            id={id}
            role="tooltip"
            style={{ top: position.top, left: position.left }}
            className={cn(
              "pointer-events-none fixed z-99999",
              "w-max max-w-[250px]",
              "rounded-md",
              "bg-foreground",
              "px-2.5 py-1.5",
              "text-xs font-normal",
              "text-background",
              "shadow-md",
              "animate-[tooltip-fade-in_150ms_ease]",
              className,
            )}
          >
            {content}
          </span>,
          document.body,
        )}
    </span>
  );
};

export default Tooltip;
