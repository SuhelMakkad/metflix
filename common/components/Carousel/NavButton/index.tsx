import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { MdArrowBackIos } from "react-icons/md";

export interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  direction?: "left" | "right";
}

const NavButton = ({ className, direction = "left", ...props }: Props) => {
  return (
    <button
      {...props}
      title={`Scroll to the ${direction}`}
      className={`
        ${className} absolute top-1/2 z-10 grid h-16 w-16 -translate-y-1/2
        scale-50 place-content-center rounded-full bg-black/50 p-4 text-4xl opacity-0 transition-all
        duration-300 focus-within:block hover:bg-black/80 focus-visible:translate-x-0
        focus-visible:opacity-100 group-focus-within/carousel:translate-x-0
        group-focus-within/carousel:opacity-100 group-hover/carousel:translate-x-0
        group-hover/carousel:opacity-100 group-focus-visible/carousel:translate-x-0
        group-focus-visible/carousel:opacity-100 md:scale-75 xl:scale-100 ${
          direction === "right"
            ? "right-4 origin-right translate-x-32  md:right-6 xl:right-8"
            : "left-4 origin-left -translate-x-32 md:left-6 xl:left-8"
        }
      `}
    >
      <MdArrowBackIos
        className={`${
          direction === "right"
            ? "-translate-x-1.5 rotate-180"
            : "translate-x-1.5"
        }`}
      />
    </button>
  );
};

export default NavButton;
