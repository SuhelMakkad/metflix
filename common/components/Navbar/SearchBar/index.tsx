"use client";

import type { ChangeEvent } from "react";

import { useRouter } from "next/navigation";

import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;

    const searchPage = `/search?q=${value}`;
    router.replace(searchPage);
  };

  return (
    <label
      htmlFor="main-search"
      className="group/search-wrapper ml-auto flex items-center gap-1"
      tabIndex={0}
    >
      <BiSearch className="text-xl" />
      <input
        type="search"
        id="main-search"
        className="
          hidden border-none bg-transparent
          group-focus-within/search-wrapper:block
        "
        onChange={handleInputChange}
      />
    </label>
  );
};

export default SearchBar;
