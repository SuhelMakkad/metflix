"use client";

import { MdLocalPrintshop } from "react-icons/md";

const PrintBtn = () => {
  return (
    <button
      onClick={() => window.print()}
      className="
        flex items-center gap-2 rounded-sm bg-stone-900 py-2 px-3 text-lg font-semibold 
        uppercase text-white outline outline-2 outline-white transition-colors 
        hover:bg-transparent focus-visible:bg-transparent focus-visible:outline-red-500
      "
    >
      <MdLocalPrintshop className="fill-white text-2xl" />
      <span className="hidden text-inherit md:block">print</span>
    </button>
  );
};

export default PrintBtn;
