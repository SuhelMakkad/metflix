"use client";

import { useRef } from "react";

import CarouselImage from "./CarouselImage";
import LoadingImage from "./LoadingImage";
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
    <div className="group/carousel md:-mx4 lg:-mx6 relative -mx-3 overflow-hidden 2xl:-mx-8">
      {items.length ? (
        <>
          <NavButton onClick={scrollLeft} />
          <NavButton onClick={scrollRight} direction="right" />
        </>
      ) : (
        ""
      )}
      <ul
        onDrag={console.log}
        ref={listRef}
        className="
          scroll-hidden flex flex-none gap-5 
          overflow-x-auto overflow-y-hidden scroll-smooth 
          md:gap-6 2xl:gap-8
        "
      >
        <li className="-mr-5 h-1 w-3 shrink-0 md:-mr-6 md:w-4 lg:w-6 2xl:-mr-8 2xl:w-8" />

        {items.length
          ? items.map((movie) => (
              <li key={movie.postImg} className={"shrink-0"}>
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

        <li className="-mr-5 h-1 w-3 shrink-0 md:-mr-6 md:w-4 lg:w-6 2xl:-mr-8 2xl:w-8" />
      </ul>
    </div>
  );
};

export default ImageCarousel;
