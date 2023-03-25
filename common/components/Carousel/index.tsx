"use client";

import { useRef } from "react";

import CarouselImage from "./CarouselImage";
import LoadingImage from "./LoadingImage";
import NavButton from "./NavButton";

export type Props = {
  items: {
    id: number;
    postImg: string;
    title?: string;
    href?: string;
    avgRatings?: number;
    totalRatings?: number;
    details?: React.ReactElement;
  }[];
};

const ImageCarousel = ({ items }: Props) => {
  const loadingCardCount = 20;
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
    <div className="group/carousel relative -mx-3 overflow-hidden md:-mx-4 lg:-mx-6 2xl:-mx-8">
      {items.length ? (
        <>
          <NavButton onClick={scrollLeft} />
          <NavButton onClick={scrollRight} direction="right" />
        </>
      ) : (
        ""
      )}
      <ul
        ref={listRef}
        className="
          scroll-hidden flex flex-none gap-3
          overflow-x-auto overflow-y-hidden scroll-smooth 
          md:gap-4 2xl:gap-6
        "
      >
        <li className="-mr-3 h-1 w-3 shrink-0 md:-mr-4 md:w-4 lg:w-6 2xl:-mr-6 2xl:w-8" />

        {items.length
          ? items.map((movie) => (
              <li key={movie.id} className={"shrink-0"}>
                <CarouselImage movie={movie} />
              </li>
            ))
          : Array(loadingCardCount)
              .fill(0)
              .map((_, index) => (
                <li key={index} className={"shrink-0"}>
                  <LoadingImage />
                </li>
              ))}

        <li />
      </ul>
    </div>
  );
};

export default ImageCarousel;
