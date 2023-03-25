"use client";

import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

import { getMovies } from "@/tmdb/api/movie";
import type { MovieType, Movies } from "@/tmdb/types/movie";

import SectionHeading from "@/components/SectionHeading";
import ImageList from "@/components/List";
import LoadingImages from "@/components/List/Loading";
import LoadingSpinner from "@/components/LoadingSpinner";

export type Props = {
  title: string;
  type: MovieType;
};

const MoviesList = ({ title, type }: Props) => {
  const [movies, setMovies] = useState<Movies>([]);
  const [currPageCount, setCurrPageCount] = useState(0);

  const [loaderDivRef, inView, entry] = useInView({});

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies({ type, page: currPageCount + 1 });
      if (!res) return;

      const { results } = res;

      setMovies((prev) => [...prev, ...results]);
      setCurrPageCount((prev) => prev + 1);
    };

    fetchMovies();
  }, [inView]);

  return (
    <section>
      <SectionHeading> {title} </SectionHeading>

      {movies.length ? (
        <ImageList
          items={movies.map((movie) => ({
            key: movie.id,
            postImg: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "",
            title: movie.title ?? movie.original_title,
            avgRatings: movie.vote_average,
            totalRatings: movie.vote_count,
            href: `/details/movie/${movie.id}`,
          }))}
        />
      ) : (
        <LoadingImages />
      )}

      {!!movies.length && (
        <div ref={loaderDivRef} className="mt-8 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default MoviesList;
