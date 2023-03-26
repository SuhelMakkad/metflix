"use client";

import { useEffect } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getMovies } from "@/tmdb/api/movie";
import type { MovieType } from "@/tmdb/types/movie";

import SectionHeading from "@/components/SectionHeading";
import ImageList from "@/components/List";
import LoadingImages from "@/components/List/Loading";
import LoadingSpinner from "@/components/LoadingSpinner";

export type Props = {
  title: string;
  type: MovieType;
};

const MoviesList = ({ title, type }: Props) => {
  const [loaderDivRef, inView, entry] = useInView({});

  const {
    data: moviePages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", type],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getMovies({ type, page: pageParam });
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

      {moviePages?.pages.length ? (
        <ImageList
          items={(moviePages?.pages ?? [])
            .map((movies, index) =>
              (movies?.results ?? []).map((movie) => ({
                key: movie.id,
                postImg: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "",
                title: movie.title ?? movie.original_title,
                avgRatings: movie.vote_average,
                totalRatings: movie.vote_count,
                href: `/details/movie/${movie.id}`,
              }))
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

export default MoviesList;
