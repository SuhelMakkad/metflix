"use client";

import type { TVShows } from "@/tmdb/types/tv";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

export type Props = {
  title: string;
  href?: string;
  tvShows: TVShows;
};

const TVShowsCarousel = ({ title, href, tvShows }: Props) => {
  if (!tvShows.length) return <span></span>;

  return (
    <section>
      <SectionHeading href={href}> {title} </SectionHeading>

      <ImageCarousel
        items={(tvShows ?? []).map((tv) => ({
          id: tv.id,
          postImg: tv.poster_path
            ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
            : "",
          title: tv.name ?? tv.original_name,
          avgRatings: tv.vote_average,
          totalRatings: tv.vote_count,
          href: `/details/tv-show/${tv.id}`,
        }))}
      />
    </section>
  );
};

export default TVShowsCarousel;
