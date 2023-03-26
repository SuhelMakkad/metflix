"use client";

import { useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";

import { BiSearch } from "react-icons/bi";
import debounce from "@/utils/debounce";

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  const navigateToSearchPage = (q: string) => {
    if (!q) return;

    const searchPage = `/search?q=${q}`;
    router.replace(searchPage);
  };

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    navigateToSearchPage(value);
  }, 100);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = searchRef.current?.value ?? "";
    navigateToSearchPage(value);
    (document?.activeElement as HTMLInputElement).blur();
  };

  return (
    <form className="ml-auto" onSubmit={handleSubmit}>
      <label
        htmlFor="main-search"
        className={`
          group/search-wrapper bottom-0 flex
          cursor-pointer items-center border-red-600
          py-1 focus-within:gap-2 focus-within:border-b ${
            segment === "search" ? "gap-2 border-b" : ""
          }
      `}
      >
        <BiSearch className="text-2xl" />
        <input
          ref={searchRef}
          type="search"
          id="main-search"
          className={`
          w-0 bg-transparent outline-none transition-[width] 
          group-focus-within/search-wrapper:w-[25vw] ${
            segment === "search" ? "w-[25vw]" : ""
          }
        `}
          onChange={handleInputChange}
        />
      </label>
    </form>
  );
};

export default SearchBar;
