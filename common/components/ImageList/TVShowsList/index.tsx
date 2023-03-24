"use client";

import { useEffect, useRef, useState } from "react";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import { getTVShows } from "@/tmdb/api/tv";
import type { TVType, TVShows } from "@/tmdb/types/tv";

import SectionHeading from "@/components/SectionHeading";
import ImageList from "@/components/List";
import LoadingImages from "@/components/List/Loading";

export type Props = {
  title: string;
  type: TVType;
};

const TVShowsList = ({ title, type }: Props) => {
  const [tvShows, setTVShows] = useState<TVShows>([]);
  const [currPageCount, setCurrPageCount] = useState(0);

  const loaderDivRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(loaderDivRef, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    const fetchTVShows = async () => {
      const res = await getTVShows({ type, page: currPageCount + 1 });
      if (!res) return;

      const { results } = res;

      setTVShows((prev) => [...prev, ...results]);
      setCurrPageCount((prev) => prev + 1);
    };

    fetchTVShows();
  }, [isVisible]);

  return (
    <section>
      <SectionHeading> {title} </SectionHeading>

      {tvShows.length ? (
        <ImageList
          items={tvShows.map((tv) => ({
            postImg: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
            title: tv.name ?? tv.original_name,
            avgRatings: tv.vote_average,
            totalRatings: tv.vote_count,
            href: `/details/tv-show/${tv.id}`,
          }))}
        />
      ) : (
        <LoadingImages />
      )}

      {!!tvShows.length && (
        <div ref={loaderDivRef} className="mt-3 md:mt-4 2xl:mt-6 ">
          <LoadingImages loadingCardCount={8} />
        </div>
      )}
    </section>
  );
};

export default TVShowsList;
