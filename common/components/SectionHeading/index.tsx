import Link from "next/link";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export type Props = {
  children: React.ReactNode;
  href?: string;
};

const SectionHeading = ({ href, children }: Props) => {
  return (
    <div className="group/heading mb-5 flex items-center gap-4">
      <h3 className="text-lg font-semibold md:text-xl lg:text-2xl">
        {children}
      </h3>

      {href && (
        <Link
          href={href}
          className="
            flex origin-left -translate-x-4 items-center 
            text-xs font-semibold text-[#54b9c5] opacity-0 transition-all
            duration-500 group-hover/heading:translate-x-0
            group-hover/heading:opacity-100 md:text-sm
          "
        >
          Expand All{" "}
          <MdOutlineKeyboardArrowRight className="text-base md:text-lg" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;
