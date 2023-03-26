"use client";

import { useEffect } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getTVShows } from "@/tmdb/api/tv";
import type { TVType } from "@/tmdb/types/tv";

import SectionHeading from "@/components/SectionHeading";
import ImageList from "@/components/List";
import LoadingImages from "@/components/List/Loading";
import LoadingSpinner from "@/components/LoadingSpinner";

export type Props = {
  title: string;
  type: TVType;
};

const TVShowsList = ({ title, type }: Props) => {
  const [loaderDivRef, inView, entry] = useInView({});

  const {
    data: tvShowPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["tv", type],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getTVShows({ type, page: pageParam });
      if (!res) return null;

      return res;
    },
    getNextPageParam: (lastPage, page) => {
      const currPageCount = page.length;
      const totalPages = lastPage?.total_pages ?? 0;

      return currPageCount >= totalPages ? undefined : currPageCount + 1;
    },
  });

  useEffect(() => {
    fetchNextPage();
  }, [inView]);

  return (
    <section>
      <SectionHeading> {title} </SectionHeading>

      {tvShowPages?.pages.length ? (
        <ImageList
          items={(tvShowPages?.pages ?? [])
            .map((tvShows, index) => {
              const items = (tvShows?.results ?? []).map((tv) => ({
                key: tv.id,
                postImg: tv.poster_path
                  ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                  : "",
                title: tv.name ?? tv.original_name,
                avgRatings: tv.vote_average,
                totalRatings: tv.vote_count,
                href: `/details/tv-show/${tv.id}`,
              }));

              return items;
            })
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

export default TVShowsList;
