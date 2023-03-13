"use client";

import { useRef } from "react";

import CarouselImage from "./CarouselImage";
import NavButton from "./NavButton";

export type Props = {
  items: {
    postImg: string;
    title: string;
    avgRatings: number;
    totalRatings: number;
  }[];
};

const ImageCarousel = ({ items }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    const list = listRef.current;
    if (!list) return;

    list.scrollLeft -= list.clientWidth;
  };

  const scrollRight = () => {
    const list = listRef.current;
    if (!list) return;

    const { scrollLeft, clientWidth, scrollWidth } = list;

    const deltaWidth = scrollWidth - scrollLeft - clientWidth;

    if (deltaWidth < 20) {
      list.scrollLeft = 0;
    } else {
      list.scrollLeft += list.clientWidth;
    }
  };

  return (
    <div className="group/carousel relative -mx-8 overflow-hidden">
      <NavButton onClick={scrollLeft} />
      <NavButton onClick={scrollRight} direction="right" />

      <ul
        ref={listRef}
        className="
          scroll-hidden flex flex-none gap-5
          overflow-x-auto overflow-y-hidden scroll-smooth 
          md:gap-6 2xl:gap-8
        "
      >
        <li className="-mr-5 h-1 w-[2rem] shrink-0" />

        {items.map((movie) => (
          <li key={movie.postImg} className={"shrink-0"}>
            <CarouselImage movie={movie} />
          </li>
        ))}

        <li className="-mr-5 h-1 w-[2rem] shrink-0" />
      </ul>
    </div>
  );
};

export default ImageCarousel;
