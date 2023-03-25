"use client";

import { useState, useEffect, useCallback } from "react";

import { useSearchParams } from "next/navigation";

import { useInView } from "react-intersection-observer";

import ImageList from "@/components/List";
import LoadingImages from "@/components/List/Loading";
import LoadingSpinner from "@/components/LoadingSpinner";
import SectionHeading from "@/components/SectionHeading";

import { searchAll } from "@/tmdb/api/search";
import type { MultiSearchRes } from "@/tmdb/types/search";

export type Item = MultiSearchRes["results"][number];

const SearchSection = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currPageCount, setCurrPageCount] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [loaderDivRef, inView, entry] = useInView({});

  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const getDetails = useCallback((item: Item) => {
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
  }, []);

  const fetchMovies = useCallback(
    async (signal: AbortSignal, unmounted: boolean) => {
      const res = await searchAll({
        query,
        page: currPageCount + 1,
        signal: signal,
      });
      if (!res || unmounted) return;

      const { results, total_pages } = res;

      setItems((prev) => [...prev, ...results]);
      setCurrPageCount((prev) => prev + 1);
      setTotalPageCount(total_pages);
    },
    [query, currPageCount]
  );

  useEffect(() => {
    if (currPageCount !== 0 && currPageCount >= totalPageCount) return;
    const controller = new AbortController();
    let unmounted = false;

    fetchMovies(controller.signal, unmounted);

    return () => {
      unmounted = true;
      controller.abort();
    };
  }, [inView]);

  useEffect(() => {
    setItems([]);
    setCurrPageCount(0);
    setTotalPageCount(0);

    const controller = new AbortController();
    let unmounted = false;

    fetchMovies(controller.signal, unmounted);

    return () => {
      unmounted = true;
      controller.abort();
    };
  }, [query]);

  if (currPageCount > 0 && items.length === 0) {
    return (
      <div className="grid min-h-[70vh] place-content-center text-center text-4xl">
        No Results Found for
        <span className="mt-4 italic">{query}</span>
      </div>
    );
  }

  return (
    <section>
      <SectionHeading>Search Results for: {query}</SectionHeading>

      {items.length ? (
        <ImageList
          items={items.map((item) => {
            const details = getDetails(item);
            return {
              key: details.key,
              postImg: details.postImg
                ? `https://image.tmdb.org/t/p/w500${details.postImg}`
                : "",
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
