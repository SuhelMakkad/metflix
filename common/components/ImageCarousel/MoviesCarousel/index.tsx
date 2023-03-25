"use client";

import { getMovies } from "@/tmdb/api/movie";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

import type { DetailType } from "@/tmdb/types";
import type { MovieType } from "@/tmdb/types/movie";
import { useQuery } from "@tanstack/react-query";

export type Props = {
  title: string;
  id?: string;
  href?: string;
  type: MovieType | DetailType;
};

const MoviesCarousel = ({ title, href, type, id }: Props) => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", type, id],
    queryFn: async () => {
      const res = await getMovies({ type, id });
      if (!res) return null;

      return res.results;
    },
  });

  if (!isLoading && (!movies || !movies.length)) return <span></span>;

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
