"use client";

import { useEffect, useState } from "react";

import { getTVShows } from "@/api/tmdb";
import type { TVType, TVShows } from "@/api/types";

import SectionHeading from "@/components/SectionHeading";
import ImageList from "@/components/List";

export type Props = {
  title: string;
  type: TVType;
};

const TVShowsList = ({ title, type }: Props) => {
  const [tvShows, setTVShows] = useState<TVShows>([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      const res = await getTVShows(type);

      if (!res) return;

      const { results } = res;

      setTVShows(results);
    };

    fetchTVShows();
  }, []);

  return (
    <section>
      <SectionHeading> {title} </SectionHeading>

      <ImageList
        items={tvShows.map((movie) => ({
          postImg: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.name ?? movie.original_name,
          avgRatings: movie.vote_average,
          totalRatings: movie.vote_count,
        }))}
      />
    </section>
  );
};

export default TVShowsList;
