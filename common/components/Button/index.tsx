import React, { HTMLAttributeAnchorTarget } from "react";

import Link from "next/link";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const button = cva(["font-semibold", "text-center", "rounded", "transition"], {
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
});

export interface ButtonOrLinkProps
  extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    VariantProps<typeof button> {
  href?: string;
  className?: string;
  children?: JSX.Element | string;
  target?: HTMLAttributeAnchorTarget | undefined;
}

const Button = ({
  children,
  intent,
  size,
  uppercase,
  elevated,
  href,
  className,
  ...props
}: ButtonOrLinkProps) => {
  const buttonClass = `${button({
    intent,
    size,
    uppercase,
    elevated,
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
