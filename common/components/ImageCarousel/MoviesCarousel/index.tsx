"use client";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

import type { Movies } from "@/tmdb/types/movie";

export type Props = {
  title: string;
  href?: string;
  movies: Movies;
};

const MoviesCarousel = ({ title, href, movies }: Props) => {
  if (!movies.length) return <span></span>;

  return (
    <section>
      <SectionHeading href={href}> {title} </SectionHeading>

      <ImageCarousel
        items={(movies ?? []).map((movie) => ({
          id: movie.id,
          postImg: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "",
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
