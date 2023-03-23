"use client";

import { useEffect, useState } from "react";

import { Movies } from "@/api/types";
import { getMovies } from "@/api/tmdb";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

const TrendingNowMovies = () => {
  const [movies, setMovies] = useState<Movies>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies("trending");

      if (!res) return;

      const { results } = res;

      setMovies(results);
    };

    fetchMovies();
  }, []);

  return (
    <section>
      <header>
        <SectionHeading href="/"> Trending Now </SectionHeading>
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

export default TrendingNowMovies;
