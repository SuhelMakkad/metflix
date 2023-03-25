import Link from "next/link";

import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import Year from "./Year";

const Footer = () => {
  const myName = "Suhel Makkad";
  const socials = [
    {
      icon: <AiFillGithub />,
      href: "https://github.com/SuhelMakkad",
      label: `GitHub Account ${myName}`,
    },
    {
      icon: <AiFillLinkedin />,
      href: "https://www.linkedin.com/in/suhel-makkad-606a3219b",
      label: `Linkedin Account ${myName}`,
    },
    {
      icon: <AiOutlineTwitter />,
      href: "https://twitter.com/suhel_makad",
      label: `Twitter Account ${myName}`,
    },
    {
      icon: <AiOutlineInstagram />,
      href: "https://www.instagram.com/suhel_makkad",
      label: `Instagram Account ${myName}`,
    },
  ];

  const links = [
    {
      label: "Contact Us",
      href: "mailto:makadsuhel11@gmail.com",
    },
    {
      label: "Privacy Policy",
      href: "/legal/privacy",
    },
    {
      label: "Terms of Use",
      href: "/legal/termsofuse",
    },
    {
      label: "TMDB",
      href: "https://www.themoviedb.org",
    },
    {
      label: "NextJS 13",
      href: "https://nextjs.org",
    },
    {
      label: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    {
      label: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      label: "React Icons",
      href: "https://github.com/react-icons/react-icons",
    },
  ];

  return (
    <footer
      className="
        mx-auto mt-20 flex max-w-7xl flex-col items-center
        gap-10 px-8 pb-4 text-center text-sm
        text-stone-400 md:items-start md:gap-6 md:text-start
      "
    >
      <ul className="flex gap-6 text-2xl text-white">
        {socials.map((social) => (
          <li
            key={social.href}
            className="scale-100 transition-transform hover:scale-105"
          >
            <Link
              target={"_blank"}
              href={social.href}
              aria-label={social.label}
            >
              {social.icon}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="grid w-full grid-cols-2 justify-between gap-4 md:grid-cols-3 lg:grid-cols-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              target={"_blank"}
              href={link.href}
              className="underline-offset-1 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex">
        <Link
          target={"_blank"}
          href={"https://github.com/SuhelMakkad/metflix"}
          className="
            border border-stone-400 px-4 py-2 transition-colors
            focus-within:border-stone-50 focus-within:text-stone-50 focus-within:outline-none
            hover:border-stone-50 hover:text-stone-50
          "
        >
          Source Code
        </Link>
      </div>

      <span>
        © <Year /> Metflix, Inc.
      </span>
    </footer>
  );
};

export default Footer;
