"use client";

import { useEffect, useState } from "react";

import { TVShows } from "@/api/types";
import { getTVShows } from "@/api/tmdb";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

const TopRatedTVShows = () => {
  const [movies, setMovies] = useState<TVShows>([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      const res = await getTVShows("top_rated");

      if (!res) return;

      const { results } = res;

      setMovies(results);
    };

    fetchTVShows();
  }, []);

  return (
    <section>
      <header>
        <SectionHeading href="/"> Top Rated TV Shows </SectionHeading>
      </header>

      <ImageCarousel
        items={movies.map((movie) => ({
          postImg: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.name ?? movie.original_name,
          avgRatings: movie.vote_average,
          totalRatings: movie.vote_count,
        }))}
      />
    </section>
  );
};

export default TopRatedTVShows;
