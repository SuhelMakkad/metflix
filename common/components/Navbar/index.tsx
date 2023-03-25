"use client";

import Link from "next/link";

import { useInView } from "react-intersection-observer";

import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [loaderDivRef, inView, entry] = useInView({});

  return (
    <div ref={loaderDivRef}>
      <nav
        className={`
          tb-overlay fixed top-0 left-0 right-0
          isolate z-50 flex w-full 
          items-center gap-4 py-4 px-3
          transition-colors duration-500 md:px-4 lg:px-6 2xl:px-8
          ${inView ? "" : "bg-black"}
        `}
      >
        <Link
          href={"/"}
          className="mr-4 text-3xl font-bold uppercase text-red-600 md:mr-6 lg:mr-8"
        >
          Metflix
        </Link>

        <NavLinks />

        <SearchBar />
      </nav>
    </div>
  );
};

export default Navbar;
