"use client";

import { useSelectedLayoutSegments } from "next/navigation";

import Link from "next/link";

const NavLinks = () => {
  const navItems = [
    {
      label: "Movies",
      href: "/genre/movies",
    },
    {
      label: "Tv Shows",
      href: "/genre/tv-shows",
    },
    {
      label: "My List",
      href: "/my-list",
    },
  ];

  const segments = useSelectedLayoutSegments();
  const currentPath = segments.reduce((prev, curr) => `${prev}/${curr}`, "");

  return (
    <ul className="flex items-center gap-4 text-stone-300">
      {navItems.map((navItem) => (
        <li
          key={navItem.href}
          className={`${
            currentPath === navItem.href ? "text-white" : "hover:text-stone-400"
          } transition-colors`}
        >
          <Link href={navItem.href}>{navItem.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
