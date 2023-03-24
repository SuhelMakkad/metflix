"use client";

import { useEffect, useState } from "react";

import { getMovies } from "@/tmdb/api/tmdb";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";
import type { Movies, MovieType } from "@/tmdb/types/movie";

export type Props = {
  title: string;
  href?: string;
  type: MovieType;
};

const MoviesCarousel = ({ title, href, type }: Props) => {
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
      <SectionHeading href={href}> {title} </SectionHeading>

      <ImageCarousel
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

export default MoviesCarousel;
