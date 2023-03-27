"use client";

import Link from "next/link";

import NextTopLoader from "nextjs-toploader";
import { useInView } from "react-intersection-observer";

import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [loaderDivRef, inView, entry] = useInView({
    initialInView: true,
  });

  return (
    <div ref={loaderDivRef}>
      <NextTopLoader color="rgb(220,38,38)" showSpinner={false} />

      <nav
        className={`
          tb-overlay fixed top-0 left-0 right-0
          isolate z-50 flex w-full 
          items-center gap-2 py-4 px-3 transition-colors
          duration-500 md:gap-4 md:px-4 lg:px-6 2xl:px-8
          ${inView ? "" : "bg-black"}
        `}
      >
        <Link
          href={"/"}
          className="mr-4 text-2xl font-bold uppercase text-red-600 md:mr-6 md:text-3xl lg:mr-8"
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
