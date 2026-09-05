"use client";

import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import ResponsivePagination, {
  defaultLabelBehaviour,
  type LabelBehaviour,
} from "react-responsive-pagination";
import { cn } from "@/lib";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  maxWidth?: number;
  containerClassName?: string;
  pageItemClassName?: string;
  pageLinkClassName?: string;
  activeItemClassName?: string;
  inactiveItemClassName?: string;
  disabledItemClassName?: string;
  navClassName?: string;
  previousClassName?: string;
  nextClassName?: string;
}
/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */
const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const toPersianDigits = (value: string | number): string =>
  String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);

const persianLabelBehaviour: LabelBehaviour = (item) => {
  if (item.type === "page" && typeof item.label === "string") {
    return defaultLabelBehaviour({
      ...item,
      label: toPersianDigits(item.label),
    });
  }

  return defaultLabelBehaviour(item);
};
/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      current,
      total,
      onPageChange,
      maxWidth,
      className,
      containerClassName,
      pageItemClassName,
      pageLinkClassName,
      activeItemClassName,
      inactiveItemClassName,
      disabledItemClassName,
      navClassName,
      previousClassName,
      nextClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("w-full", className)}
        {...rest}
        dir="ltr"
      >
        <ResponsivePagination
          current={current}
          total={total}
          onPageChange={onPageChange}
          maxWidth={maxWidth}
          linkHref="omit"
          renderNav="button"
          labelBehaviour={persianLabelBehaviour}
          ariaPageLabel={(page, active) =>
            active ?
              `صفحه ${toPersianDigits(page)}، صفحه فعلی`
            : `صفحه ${toPersianDigits(page)}`
          }
          classMerge={cn}
          containerClassName={cn(
            "m-0 flex list-none items-center justify-center gap-1 p-0",
            containerClassName,
          )}
          pageItemClassName={cn(
            "inline-flex items-center justify-center",
            pageItemClassName,
          )}
          pageLinkClassName={cn(
            "inline-flex min-h-9 min-w-9 items-center justify-center",
            "rounded-md px-3",
            "text-sm font-medium",
            "cursor-pointer",
            "outline-none",
            "transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
            "disabled:cursor-not-allowed",
            pageLinkClassName,
          )}
          activeItemClassName={cn(
            "rounded-md bg-primary text-background",
            "hover:bg-primary/90",
            activeItemClassName,
          )}
          inactiveItemClassName={cn(
            "text-foreground",
            "hover:bg-secondary",
            inactiveItemClassName,
          )}
          disabledItemClassName={cn(
            "pointer-events-none",
            "cursor-not-allowed",
            "text-muted-foreground",
            "opacity-50",
            disabledItemClassName,
          )}
          navClassName={cn("text-foreground", navClassName)}
          previousClassName={cn(
            "text-foreground",
            "hover:bg-secondary",
            previousClassName,
          )}
          nextClassName={cn(
            "text-foreground",
            "hover:bg-secondary",
            nextClassName,
          )}
        />
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";

export default Pagination;
