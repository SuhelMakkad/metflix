"use client";

import { useEffect, useCallback } from "react";

import { useSearchParams } from "next/navigation";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import ImageList from "@/components/List";
import LoadingImages from "@/components/List/Loading";
import LoadingSpinner from "@/components/LoadingSpinner";
import SectionHeading from "@/components/SectionHeading";

import { searchAll } from "@/tmdb/api/search";
import type { MultiSearchRes } from "@/tmdb/types/search";

export type Item = MultiSearchRes["results"][number];

const SearchSection = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [loaderDivRef, inView, entry] = useInView({});

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
        href: `/details/person/${item.id}`,
      };
    }

    return details;
  }, []);

  const {
    data: itemPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetched,
  } = useInfiniteQuery({
    queryKey: [query],
    queryFn: ({ pageParam = 1 }) =>
      searchAll({
        query,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, page) => {
      const currPageCount = page.length;
      const totalPages = lastPage?.total_pages ?? 0;

      return currPageCount >= totalPages ? undefined : currPageCount + 1;
    },
  });

  useEffect(() => {
    fetchNextPage();
  }, [inView]);

  if (
    isFetched &&
    (!itemPages ||
      !itemPages.pages.length ||
      !itemPages.pages[0]?.results.length)
  ) {
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

      {!isLoading && itemPages?.pages.length ? (
        <ImageList
          items={itemPages.pages
            .map((items) =>
              (items?.results ?? []).map((item) => {
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
              })
            )
            .reduce((p, c) => p.concat(c), [])}
        />
      ) : (
        <LoadingImages />
      )}

      {hasNextPage && (
        <div ref={loaderDivRef} className="mt-8 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default SearchSection;
