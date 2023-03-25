"use client";

import { useQuery } from "@tanstack/react-query";

import { getTVShows } from "@/tmdb/api/tv";
import type { DetailType } from "@/tmdb/types";
import type { TVType } from "@/tmdb/types/tv";

import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

export type Props = {
  title: string;
  id?: string;
  href?: string;
  type: TVType | DetailType;
};

const TVShowsCarousel = ({ title, id, href, type }: Props) => {
  const { data: tvShows, isLoading } = useQuery({
    queryKey: ["tv", type, id],
    queryFn: async () => {
      const res = await getTVShows({ type, id });
      if (!res) return null;

      return res.results;
    },
  });

  if (!isLoading && (!tvShows || !tvShows.length)) return <span></span>;

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
