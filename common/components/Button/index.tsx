import React, { ButtonHTMLAttributes } from "react";

import Link, { LinkProps } from "next/link";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const button = cva(
  [
    "focus-visible:outline-none",
    "focus-visible:ring",
    "focus-visible:ring-white",
    "font-semibold",
    "text-center",
    "rounded",
    "transition",
  ],
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
      focusOutlined: {
        true: ["focus-visible:outline", "outline-offset-4"],
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
      focusOutlined: true,
    },
  }
);

export interface ButtonOrLinkProps
  extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    VariantProps<typeof button> {
  href?: string;
  className?: string;
  children?: JSX.Element | string;
}

const Button = ({
  children,
  intent,
  size,
  uppercase,
  elevated,
  focusOutlined,
  href,
  className,
  ...props
}: ButtonOrLinkProps) => {
  const buttonClass = `${button({
    intent,
    size,
    uppercase,
    elevated,
    focusOutlined,
  })} ${className}`;
  if (href) {
    return (
      <Link {...props} href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
