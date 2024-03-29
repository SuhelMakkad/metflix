import React from "react";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

export const buttonClass = cva(
  ["font-semibold", "text-center", "rounded", "transition"],
  {
    variants: {
      intent: {
        monochrome: ["bg-stone-100", "hover:bg-stone-100/80", "text-black"],
        translucent: ["bg-stone-500/80", "hover:bg-stone-600/60", "text-white"],
      },
      size: {
        small: ["text-sm", "py-1", "px-4", ""],
        medium: ["text-base", "py-1", "px-5"],
        large: ["text-lg", "py-2", "px-8"],
      },
      uppercase: {
        true: "uppercase",
      },

      elevated: {
        true: [
          "hover:-translate-y-0.5",
          "active:translate-y-px",
          "hover:drop-shadow-xl",
          "active:drop-shadow-md",
        ],
      },
    },
    defaultVariants: {
      intent: "monochrome",
      size: "medium",
    },
  }
);

export interface ButtonOrLinkProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClass> {
  className?: string;
  children?: JSX.Element | string;
}

const Button = ({
  children,
  intent,
  size,
  uppercase,
  elevated,
  className,
  ...props
}: ButtonOrLinkProps) => {
  return (
    <button
      {...props}
      className={buttonClass({
        intent,
        size,
        uppercase,
        elevated,
        className,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
