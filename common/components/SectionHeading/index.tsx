import Link from "next/link";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export type Props = {
  children: React.ReactNode;
  href?: string;
};

const SectionHeading = ({ href, children }: Props) => {
  return (
    <div className="group/heading mb-5 flex items-center gap-4">
      <h3 className="text-2xl font-semibold">{children}</h3>

      {href && (
        <Link
          href={href}
          className="
            flex origin-left -translate-x-4 items-center 
            text-sm font-semibold text-[#54b9c5] opacity-0
            transition-all duration-500
            group-hover/heading:translate-x-0 group-hover/heading:opacity-100
          "
        >
          Expand All <MdOutlineKeyboardArrowRight className="text-lg" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;
