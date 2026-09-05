"use client";

import {
  forwardRef,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import Close from "@/public/icon/Close";
import { cn } from "@/lib";
import { breakpoints } from "@/styles/breakpoints";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  compact?: boolean;
}
/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, children, title, compact = false }, ref) => {
    const titleId = useId();
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [isLaptopOrLarger, setIsLaptopOrLarger] = useState(false);
    const isVisible = open && isLaptopOrLarger;

    useEffect(() => {
      const mediaQuery = window.matchMedia(
        `(min-width: ${breakpoints.laptop})`,
      );
      const updateMatch = () => setIsLaptopOrLarger(mediaQuery.matches);

      updateMatch();
      mediaQuery.addEventListener("change", updateMatch);
      return () => mediaQuery.removeEventListener("change", updateMatch);
    }, []);

    useEffect(() => {
      if (!isVisible) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isVisible, onClose]);

    useEffect(() => {
      if (!isVisible) return;
      closeButtonRef.current?.focus();
    }, [isVisible]);

    useEffect(() => {
      if (!isVisible) return;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      const previousBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      return () => {
        document.documentElement.style.overflow = previousHtmlOverflow;
        document.body.style.overflow = previousBodyOverflow;
      };
    }, [isVisible]);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
      <div
        className={cn(
          "fixed inset-0 z-[1000]",
          "flex items-center justify-center",
          "bg-black/50",
          "backdrop-blur-[13px]",
          "[-webkit-backdrop-filter:blur(13px)]",
        )}
        onClick={onClose}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(event) => event.stopPropagation()}
          className={cn(
            "relative flex h-max max-h-[85dvh] w-[min(95vw,700px)] max-w-[95vw] flex-col",
            "overflow-x-hidden",
            "rounded-lg",
            "bg-background",
            "shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
            "animate-[modal-fade-in-scale_250ms_ease]",
            compact ? "w-max max-w-[min(95vw,520px)]" : "lg:max-w-[60%]",
          )}
        >
          <div
            className={cn(
              "sticky top-0 z-10",
              "flex items-center justify-between gap-3",
              "bg-primary",
              "px-4 py-3",
            )}
          >
            <h2 id={titleId} className="text-[18px] font-medium text-white">
              {title}
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={cn(
                "flex size-8 shrink-0 items-center justify-center",
                "cursor-pointer",
                "rounded-md",
                "border border-white/30",
                "bg-white/20",
                "text-white",
                "shadow-sm",
                "transition-colors",
                "hover:bg-white/30",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-white/60",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-primary",
              )}
            >
              <Close />
            </button>
          </div>

          <div
            className={cn(
              "min-h-[20dvh]",
              "max-h-[76dvh]",
              "flex-1",
              "overflow-x-hidden",
              "overflow-y-auto",
              "[-webkit-overflow-scrolling:touch]",
            )}
          >
            {children}
          </div>
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
