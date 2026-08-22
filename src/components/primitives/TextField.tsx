"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useState,
} from "react";

import styled, { css } from "styled-components";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type TextFieldVariant = "outlined" | "filled" | "underline";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: TextFieldVariant;
  error?: boolean;
  errorText?: string;
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Variant Styles                                                             */
/* -------------------------------------------------------------------------- */

const variantStyles: Record<TextFieldVariant, ReturnType<typeof css>> = {
  outlined: css`
    border: 1px solid var(--border);
    background: var(--background);
    &:hover:not(:focus-within) {
      border-color: var(--muted-foreground);
    }
    &:focus-within {
      border-color: var(--primary);
      box-shadow: 0 0 0 1px var(--primary);
    }
  `,
  filled: css`
    border: 1px solid transparent;
    background: var(--secondary);
    &:hover:not(:focus-within) {
      background: color-mix(in srgb, var(--secondary) 92%, var(--foreground));
    }
    &:focus-within {
      border-color: var(--primary);
      box-shadow: 0 0 0 1px var(--primary);
    }
  `,
  underline: css`
    border: none;
    border-bottom: 1px solid var(--border);
    border-radius: 0;
    background: transparent;
    &:hover:not(:focus-within) {
      border-bottom-color: var(--muted-foreground);
    }
    &:focus-within {
      border-bottom-color: var(--primary);
      box-shadow: 0 1px 0 var(--primary);
    }
  `,
};
/* -------------------------------------------------------------------------- */
/* Wrapper                                                                    */
/* -------------------------------------------------------------------------- */
const FieldWrapper = styled.div`
  width: 100%;
  min-width: 0;
`;
/* -------------------------------------------------------------------------- */
/* Field Container                                                            */
/* -------------------------------------------------------------------------- */
interface FieldContainerProps {
  $variant: TextFieldVariant;
  $error: boolean;
  $disabled: boolean;
}
const FieldContainer = styled.div<FieldContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  border-radius: 6px;
  padding-block-start: 8px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  ${({ $variant }) => variantStyles[$variant]}
  /* ------------------------------------------------------------------------ */
  /* Error                                                                    */
  /* ------------------------------------------------------------------------ */
  ${({ $error }) =>
    $error &&
    css`
      border-color: var(--destructive) !important;
      &:focus-within {
        border-color: var(--destructive) !important;
        box-shadow: 0 0 0 1px var(--destructive);
      }
    `}
  /* ------------------------------------------------------------------------ */
  /* Disabled                                                                 */
  /* ------------------------------------------------------------------------ */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--muted);
      &:hover {
        border-color: var(--border);
      }
    `}
`;
/* -------------------------------------------------------------------------- */
/* Label                                                                      */
/* -------------------------------------------------------------------------- */
interface FieldLabelProps {
  $error: boolean;
}
const FieldLabel = styled.label<FieldLabelProps>`
  position: absolute;
  z-index: 1;
  top: 0;
  inset-inline-start: 12px;
  transform: translateY(-50%);
  padding-inline: 6px;
  pointer-events: none;
  background: var(--background);
  font-family: var(--sans-font);
  font-size: 12px;
  line-height: 1;
  color: ${({ $error }) =>
    $error ? "var(--destructive)" : "var(--muted-foreground)"};
  transition: color 0.2s ease;
  ${FieldContainer}:focus-within & {
    color: ${({ $error }) =>
      $error ? "var(--destructive)" : "var(--primary)"};
  }
`;
/* -------------------------------------------------------------------------- */
/* Field Row                                                                  */
/* -------------------------------------------------------------------------- */
const FieldRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
`;
/* -------------------------------------------------------------------------- */
/* Input                                                                      */
/* -------------------------------------------------------------------------- */
interface StyledInputProps {
  $hasFloatingLabel: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  flex: 1;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: transparent;
  padding-block: 10px;
  padding-inline: 12px;
  font-family: var(--sans-font);
  font-size: 14px;
  line-height: 1.5;
  color: var(--foreground);
  caret-color: var(--primary);
  text-align: start;
  &::placeholder {
    color: ${({ $hasFloatingLabel }) =>
      $hasFloatingLabel ? "transparent" : "var(--muted-foreground)"};
    opacity: 1;
    text-align: start;
  }
  &:disabled {
    cursor: not-allowed;
  }
  @media (max-width: 1023px) {
    font-size: 16px;
  }
  /* ------------------------------------------------------------------------ */
  /* Autofill                                                                 */
  /* ------------------------------------------------------------------------ */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--foreground);
    -webkit-box-shadow: 0 0 0 1000px var(--background) inset;
    transition:
      background-color 9999s ease-out,
      color 9999s ease-out;
  }
`;
/* -------------------------------------------------------------------------- */
/* Adornment                                                                  */
/* -------------------------------------------------------------------------- */
interface AdornmentProps {
  $position: "start" | "end";
}

const Adornment = styled.span<AdornmentProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--muted-foreground);
  ${({ $position }) =>
    $position === "start" ?
      css`
        margin-inline-start: 12px;
      `
    : css`
        margin-inline-end: 12px;
      `}
`;
/* -------------------------------------------------------------------------- */
/* Error Message                                                              */
/* -------------------------------------------------------------------------- */
const ErrorMessage = styled.span`
  display: block;
  margin-top: 4px;
  padding-inline: 4px;
  font-family: var(--sans-font);
  font-size: 12px;
  line-height: 1.4;
  color: var(--destructive);
`;
/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = "outlined",
      error = false,
      errorText,
      label,
      startAdornment,
      endAdornment,
      id,
      disabled = false,
      value,
      defaultValue,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    /* ---------------------------------------------------------------------- */
    /* const and variables                                                     */
    /* ---------------------------------------------------------------------- */
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = errorText ? `${inputId}-error` : undefined;
    const [isFocused, setIsFocused] = useState(false);

    const controlledHasValue = value !== undefined && String(value).length > 0;

    const defaultHasValue =
      value === undefined &&
      defaultValue !== undefined &&
      String(defaultValue).length > 0;

    const hasValue = controlledHasValue || defaultHasValue;

    const shouldShowLabel = Boolean(label) && (isFocused || hasValue);
    /* ---------------------------------------------------------------------- */
    /* render                                                                  */
    /* ---------------------------------------------------------------------- */
    return (
      <FieldWrapper>
        <FieldContainer $variant={variant} $error={error} $disabled={disabled}>
          {shouldShowLabel && (
            <FieldLabel htmlFor={inputId} $error={error}>
              {label}
            </FieldLabel>
          )}
          <FieldRow>
            {startAdornment && (
              <Adornment $position="start">{startAdornment}</Adornment>
            )}
            <StyledInput
              {...props}
              ref={ref}
              id={inputId}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              $hasFloatingLabel={shouldShowLabel}
              aria-invalid={error || undefined}
              aria-describedby={errorId}
              onFocus={(event) => {
                setIsFocused(true);
                onFocus?.(event);
              }}
              onBlur={(event) => {
                setIsFocused(false);
                onBlur?.(event);
              }}
            />
            {endAdornment && (
              <Adornment $position="end">{endAdornment}</Adornment>
            )}
          </FieldRow>
        </FieldContainer>
        {errorText && <ErrorMessage id={errorId}>{errorText}</ErrorMessage>}
      </FieldWrapper>
    );
  },
);
TextField.displayName = "TextField";

export default TextField;
