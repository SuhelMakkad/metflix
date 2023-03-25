"use client";

import { useState, useEffect } from "react";

import { useInView } from "react-intersection-observer";

import ImageList from "@/components/List";
import LoadingImages from "@/components/List/Loading";
import LoadingSpinner from "@/components/LoadingSpinner";
import SectionHeading from "@/components/SectionHeading";

import { searchAll } from "@/tmdb/api/search";
import type { MultiSearchRes } from "@/tmdb/types/search";

export type Item = MultiSearchRes["results"][number];

const SearchSection = ({ query }: { query: string }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currPageCount, setCurrPageCount] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [loaderDivRef, inView, entry] = useInView({});

  const getDetails = (item: Item) => {
    const { media_type: mediaType } = item;

    let details: { [key: string]: any } = {
      key: `${item.id}-${item.media_type}`,
      title: "",
      postImg: "",
      header: (
        <div className="absolute top-0 right-0 left-0 w-full text-center capitalize">
          <span
            className={`block px-3 py-1 text-sm opacity-90 ${
              mediaType === "movie"
                ? "bg-red-500"
                : mediaType === "tv"
                ? "bg-amber-700 "
                : "bg-stone-700"
            }`}
          >
            {mediaType === "tv" ? "TV Show" : mediaType}
          </span>
        </div>
      ),
    };

    if (mediaType === "movie") {
      details = {
        ...details,
        postImg: item.poster_path ?? item.backdrop_path,
        title: item.title ?? item.original_title,
        avgRatings: item.vote_average,
        totalRatings: item.vote_count,
        href: `/details/movie/${item.id}`,
      };
    }

    if (mediaType === "tv") {
      details = {
        ...details,
        postImg: item.poster_path ?? item.backdrop_path,
        title: item.name ?? item.original_name,
        avgRatings: item.vote_average,
        totalRatings: item.vote_count,
        href: `details/tv-show/${item.id}`,
      };
    }

    if (mediaType === "person") {
      details = {
        ...details,
        postImg: item.profile_path,
        title: item.name,
      };
    }

    return details;
  };

  useEffect(() => {
    if (currPageCount !== 0 && currPageCount >= totalPageCount) return;

    const fetchMovies = async () => {
      const res = await searchAll({
        query,
        page: currPageCount + 1,
      });
      if (!res) return;

      const { results, total_pages } = res;

      setItems((prev) => [...prev, ...results]);
      setCurrPageCount((prev) => prev + 1);
      setTotalPageCount(total_pages);
    };

    fetchMovies();
  }, [inView]);

  return (
    <section>
      <SectionHeading>Search Results for {query}</SectionHeading>

      {items.length ? (
        <ImageList
          items={items.map((item) => {
            const details = getDetails(item);
            return {
              key: details.key,
              postImg: `https://image.tmdb.org/t/p/w500${details.postImg}`,
              title: details.title,
              avgRatings: details.avgRatings,
              href: details.href,
              details: details.details,
              header: details.header,
              totalRatings: details.totalRatings,
            };
          })}
        />
      ) : (
        <LoadingImages />
      )}

      {!!items.length &&
        !(currPageCount !== 0 && currPageCount >= totalPageCount) && (
          <div ref={loaderDivRef} className="mt-8 flex justify-center">
            <LoadingSpinner />
          </div>
        )}
    </section>
  );
};

export default SearchSection;
