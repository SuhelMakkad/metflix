"use client";

import { useRef } from "react";

import CarouselImage from "./CarouselImage";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export type Props = {
  movies: {
    postImg: string;
    title: string;
    avgRatings: number;
    totalRatings: number;
  }[];
};

const ImageCarousel = ({ movies }: Props) => {
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
      <button
        onClick={scrollLeft}
        className="
          absolute top-1/2 left-8 z-10 grid h-16 w-16 origin-left -translate-y-1/2 -translate-x-32
          place-content-center rounded-full bg-black/50 p-4 text-4xl opacity-0
          transition-all duration-300 focus-within:block hover:bg-black/80
          focus-visible:translate-x-0 focus-visible:opacity-100
          group-focus-within/carousel:translate-x-0 group-focus-within/carousel:opacity-100
          group-hover/carousel:translate-x-0 group-hover/carousel:opacity-100
          group-focus-visible/carousel:translate-x-0 group-focus-visible/carousel:opacity-100
        "
      >
        <MdArrowBackIos className="translate-x-1.5" />
      </button>

      <button
        onClick={scrollRight}
        className="
          absolute top-1/2 right-8 z-10 grid h-16 w-16 origin-right -translate-y-1/2 translate-x-32
          place-content-center rounded-full bg-black/50 p-4 text-4xl opacity-0
          transition-all duration-300 focus-within:block hover:bg-black/80
          focus-visible:translate-x-0 focus-visible:opacity-100
          group-focus-within/carousel:translate-x-0 group-focus-within/carousel:opacity-100
          group-hover/carousel:translate-x-0 group-hover/carousel:opacity-100
          group-focus-visible/carousel:translate-x-0 group-focus-visible/carousel:opacity-100
        "
      >
        <MdArrowForwardIos />
      </button>

      <ul
        ref={listRef}
        className="scroll-hidden flex flex-none gap-8 overflow-x-auto overflow-y-auto scroll-smooth"
      >
        <li className="-mr-4 h-1 min-w-[2rem]" />
        {movies.map((movie) => (
          <li key={movie.postImg} className={"shrink-0"}>
            <CarouselImage movie={movie} />
          </li>
        ))}
        <li className="-ml-4 h-1 min-w-[2rem]" />
      </ul>
    </div>
  );
};

export default ImageCarousel;
