"use client";

import { useEffect, useState } from "react";

import { getMovies } from "@/tmdb/api/movie";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

import type { DetailType } from "@/tmdb/types";
import type { Movies, MovieType } from "@/tmdb/types/movie";

export type Props = {
  title: string;
  id?: string;
  href?: string;
  type: MovieType | DetailType;
};

const MoviesCarousel = ({ title, href, type, id }: Props) => {
  const [movies, setMovies] = useState<Movies>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies({ type, id });

      if (!res) return;

      const { results } = res;

      setMovies(results);
      setIsLoading(false);
    };

    fetchMovies();
  }, []);

  if (!isLoading && !movies.length) return <span></span>;

  return (
    <section>
      <SectionHeading href={href}> {title} </SectionHeading>

      <ImageCarousel
        items={movies.map((movie) => ({
          postImg: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title ?? movie.original_title,
          avgRatings: movie.vote_average,
          totalRatings: movie.vote_count,
          href: `/details/movie/${movie.id}`,
        }))}
      />
    </section>
  );
};

export default MoviesCarousel;
