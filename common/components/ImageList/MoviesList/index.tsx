"use client";

import { useEffect, useState } from "react";

import { getMovies } from "@/api/tmdb";
import type { MovieType, Movies } from "@/api/types";

import SectionHeading from "@/components/SectionHeading";
import ImageList from "@/components/List";

export type Props = {
  title: string;
  type: MovieType;
};

const MoviesList = ({ title, type }: Props) => {
  const [movies, setMovies] = useState<Movies>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(type);

      if (!res) return;

      const { results } = res;

      setMovies(results);
    };

    fetchMovies();
  }, []);

  return (
    <section>
      <SectionHeading> {title} </SectionHeading>

      <ImageList
        items={movies.map((movie) => ({
          postImg: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title ?? movie.original_title,
          avgRatings: movie.vote_average,
          totalRatings: movie.vote_count,
        }))}
      />
    </section>
  );
};

export default MoviesList;
