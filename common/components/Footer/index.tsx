import Link from "next/link";

import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";

const Footer = () => {
  const socials = [
    {
      icon: <AiFillGithub />,
      href: "https://github.com/SuhelMakkad",
    },
    {
      icon: <AiFillLinkedin />,
      href: "https://www.linkedin.com/in/suhel-makkad-606a3219b",
    },
    {
      icon: <AiOutlineTwitter />,
      href: "https://twitter.com/suhel_makad",
    },
    {
      icon: <AiOutlineInstagram />,
      href: "https://www.instagram.com/suhel_makkad",
    },
  ];

  const links = [
    {
      label: "Contact Me",
      href: "mailto:makkadsuhel11@gmail.com",
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms of Use",
      href: "/",
    },
    {
      label: "Legal Notice",
      href: "/",
    },
    {
      label: "Cookie Preference",
      href: "/",
    },
    {
      label: "Corporate Information",
      href: "/",
    },
    {
      label: "Media Center",
      href: "/",
    },
    {
      label: "Help Center",
      href: "/",
    },
  ];

  return (
    <footer
      className="
        mx-auto mt-20 flex max-w-7xl flex-col items-center
        gap-10 px-8 pb-4 text-center 
        text-stone-400 md:items-start md:gap-6 md:text-start
      "
    >
      <ul className="flex gap-6 text-3xl text-white">
        {socials.map((social) => (
          <li
            key={social.href}
            className="scale-100 transition-transform hover:scale-105"
          >
            <Link target={"_blank"} href={social.href}>
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

      <span>© 2023 Metflix, Inc.</span>
    </footer>
  );
};

export default Footer;
