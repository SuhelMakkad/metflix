"use client";

import { useEffect, useState } from "react";

import { Movies } from "@/api/types";
import { getTopRatedMovies } from "@/api/tmbd";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState<Movies>([]);

  useEffect(() => {
    const getMovies = async () => {
      const res = await getTopRatedMovies();

      if (!res) return;

      const { results } = res;

      setMovies(results);
    };

    getMovies();
  }, []);

  return (
    <section>
      <header>
        <SectionHeading href="/"> Top Rated Movies </SectionHeading>
      </header>

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

export default TopRatedMovies;
