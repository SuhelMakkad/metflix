import Link from "next/link";

import { BiSearch } from "react-icons/bi";

import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav
      className="
        tb-overlay fixed top-0 left-0 right-0 isolate z-10 
        flex w-full items-center gap-4 
        py-4 px-3 md:px-4 lg:px-6 2xl:px-8
      "
    >
      <Link
        href={"/"}
        className="mr-8 text-3xl font-bold uppercase text-red-600"
      >
        Metflix
      </Link>

      <NavLinks />

      <div className="ml-auto flex items-center gap-1">
        <BiSearch className="text-lg" />
        {/* <input
          type="search"
          id="main-search"
          className="border-none  bg-transparent outline-none"
        /> */}
      </div>
    </nav>
  );
};

export default Navbar;
