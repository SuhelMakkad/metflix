"use client";

import { useEffect, useState } from "react";

import { getTVShows } from "@/tmdb/api/tv";
import type { DetailType } from "@/tmdb/types";
import type { TVType, TVShows } from "@/tmdb/types/tv";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

export type Props = {
  title: string;
  id?: string;
  href?: string;
  type: TVType | DetailType;
};

const TVShowsCarousel = ({ title, id, href, type }: Props) => {
  const [tvShows, setTVShows] = useState<TVShows>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      const res = await getTVShows({ type, id });

      if (!res) return;

      const { results } = res;

      setTVShows(results);
      setIsLoading(false);
    };

    fetchTVShows();
  }, []);

  if (!isLoading && !tvShows.length) return <span></span>;

  return (
    <section>
      <SectionHeading href={href}> {title} </SectionHeading>

      <ImageCarousel
        items={tvShows.map((tv) => ({
          id: tv.id,
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
