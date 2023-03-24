"use client";

import { useEffect, useState, useRef } from "react";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import { getMovies } from "@/tmdb/api/movie";
import type { MovieType, Movies } from "@/tmdb/types/movie";

import SectionHeading from "@/components/SectionHeading";
import ImageList from "@/components/List";
import LoadingImages from "@/components/List/Loading";

export type Props = {
  title: string;
  type: MovieType;
};

const MoviesList = ({ title, type }: Props) => {
  const [movies, setMovies] = useState<Movies>([]);
  const [currPageCount, setCurrPageCount] = useState(0);

  const loaderDivRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(loaderDivRef, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies({ type, page: currPageCount + 1 });
      if (!res) return;

      const { results } = res;

      setMovies((prev) => [...prev, ...results]);
      setCurrPageCount((prev) => prev + 1);
    };

    fetchMovies();
  }, [isVisible]);

  return (
    <section>
      <SectionHeading> {title} </SectionHeading>

      {movies.length ? (
        <ImageList
          items={movies.map((movie) => ({
            postImg: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title ?? movie.original_title,
            avgRatings: movie.vote_average,
            totalRatings: movie.vote_count,
          }))}
        />
      ) : (
        <LoadingImages />
      )}

      {!!movies.length && (
        <div ref={loaderDivRef} className="mt-3 md:mt-4 2xl:mt-6 ">
          <LoadingImages loadingCardCount={8} />
        </div>
      )}
    </section>
  );
};

export default MoviesList;
