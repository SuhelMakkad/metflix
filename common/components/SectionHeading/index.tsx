import Link from "next/link";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export type Props = {
  children: React.ReactNode;
  href?: string;
};

const SectionHeading = ({ href, children }: Props) => {
  return (
    <header className="group/heading mb-4 flex items-center gap-4 lg:mb-5">
      <h3 className="text-xl font-semibold capitalize text-stone-200 md:text-2xl">
        {children}
      </h3>

      {href && (
        <Link
          href={href}
          className="
            flex origin-left -translate-x-4 items-center 
            text-xs font-semibold text-[#54b9c5] 
            opacity-0 transition-all duration-500 
            focus-within:translate-x-0 focus-within:opacity-100 
            group-hover/heading:translate-x-0 group-hover/heading:opacity-100 
            md:text-sm
          "
        >
          Expand All{" "}
          <MdOutlineKeyboardArrowRight className="text-base md:text-lg" />
        </Link>
      )}
    </header>
  );
};

export default SectionHeading;
