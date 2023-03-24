"use client";

import { useEffect, useState } from "react";

import { getTVShows } from "@/tmdb/api/tv";
import type { TVType, TVShows } from "@/tmdb/types/tv";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

export type Props = {
  title: string;
  href?: string;
  type: TVType;
};

const TVShowsCarousel = ({ title, href, type }: Props) => {
  const [tvShows, setTVShows] = useState<TVShows>([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      const res = await getTVShows({ type });

      if (!res) return;

      const { results } = res;

      setTVShows(results);
    };

    fetchTVShows();
  }, []);

  return (
    <section>
      <SectionHeading href={href}> {title} </SectionHeading>

      <ImageCarousel
        items={tvShows.map((tv) => ({
          postImg: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
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
