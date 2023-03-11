import Link from "next/link";

const NavLinks = () => {
  const navItems = [
    {
      label: "Movies",
      href: "/movies",
    },
    {
      label: "Tv Shows",
      href: "/tv-shows",
    },
    {
      label: "My List",
      href: "/my-list",
    },
  ];

  return (
    <ul className="flex items-center gap-4 text-stone-300">
      {navItems.map((navItem) => (
        <li key={navItem.href}>
          <Link href={navItem.href}>{navItem.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
