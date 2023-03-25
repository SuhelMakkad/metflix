"use client";

import { useRef, useState } from "react";

import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

import { RiArrowDownSFill } from "react-icons/ri";
import useOutsideClick from "@/hooks/useOnClickOutside";

const NavLinks = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  useOutsideClick([listRef], () => setIsListOpen(false));

  const navItems = [
    {
      label: "Movies",
      href: "/genre/movies",
    },
    {
      label: "Tv Shows",
      href: "/genre/tv-shows",
    },
  ];

  const segments = useSelectedLayoutSegments();
  const currentPath = segments.reduce((prev, curr) => `${prev}/${curr}`, "");

  return (
    <div className="text-md group relative md:text-lg" ref={listRef}>
      <button
        onClick={() => setIsListOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm focus-visible:border md:hidden"
      >
        {navItems.find((navItem) => navItem.href === currentPath)?.label ??
          "Catagories"}
        <RiArrowDownSFill />
      </button>

      <ul
        className={`
          absolute top-7 left-1/2 h-full -translate-x-1/2 translate-y-1 flex-col items-center
          whitespace-nowrap border-t-4 border-stone-200 text-stone-200 
          md:relative md:left-auto md:top-auto md:flex md:translate-y-0 md:translate-x-0 
          md:flex-row md:gap-6 md:border-none md:px-0 md:py-0 ${
            isListOpen ? "flex" : "hidden"
          }
        `}
      >
        {navItems.map((navItem) => (
          <li
            key={navItem.href}
            className={`
              w-full bg-black/80 py-2 px-10 
              text-center transition-colors
              hover:bg-black md:bg-transparent md:p-0 md:hover:bg-transparent ${
                currentPath === navItem.href
                  ? "text-white"
                  : "md:hover:text-stone-400"
              }`}
          >
            <Link href={navItem.href} onClick={() => setIsListOpen(false)}>
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
