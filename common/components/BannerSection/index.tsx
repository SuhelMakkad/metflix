"use client";

import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { getMovies } from "@/tmdb/api/movie";
import { getTVShows } from "@/tmdb/api/tv";
import { getVideoUrl } from "@/tmdb/api/video";

import type { Media } from "@/tmdb/types";
import type { MovieType } from "@/tmdb/types/movie";
import type { TVType } from "@/tmdb/types/tv";

import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

import LoadingBanner from "./Loading";
import Button from "../Button";
import BannerImage from "./Image";

import { getRandomInt } from "@/utils";

export type Props = {
  media: Media;
  type: TVType | MovieType;
};

const BannerSection = ({ media, type }: Props) => {
  const {
    isLoading,
    error,
    data: bannerItem,
  } = useQuery({
    queryKey: [media, type, "banner"],
    queryFn: async () => {
      const res =
        media === "movie"
          ? await getMovies({ type: type as MovieType })
          : await getTVShows({ type: type as TVType });

      if (!res) {
        throw new Error("Can not get movies");
      }
      const { results } = res;
      const rndInt = getRandomInt(0, results.length - 1);

      return results[rndInt];
    },
  });

  const title = useMemo(
    () =>
      bannerItem
        ? "title" in bannerItem
          ? bannerItem.title ?? bannerItem.original_title
          : "name" in bannerItem
          ? bannerItem.name ?? bannerItem.original_name
          : ""
        : "",
    [bannerItem]
  );

  if (isLoading) return <LoadingBanner />;

  if (!bannerItem) return <span></span>;

  return (
    <section className="relative -mx-8 max-h-[85vh] overflow-hidden">
      <div className="absolute inset-0">
        <header className="absolute bottom-1/3 z-10 w-[42rem] max-w-full px-8">
          <h1
            className="
              mb-2 text-3xl font-bold drop-shadow-[0_25px_25px_rgb(0,0,0)] 
              md:text-4xl md:drop-shadow-none lg:text-5xl xl:text-6xl
            "
          >
            {title}
          </h1>
          <p className="drop-shadow-[0_25px_25px_rgb(0 0,0)] text-stone-50 md:text-lg md:drop-shadow-none lg:text-xl">
            {bannerItem.overview?.length > 150
              ? `${bannerItem.overview.slice(0, 150)}...`
              : bannerItem.overview}
          </p>

          <div className="mt-5 flex items-stretch gap-2">
            <Button
              size={"small"}
              target="_blank"
              href={getVideoUrl(bannerItem.id, media)}
            >
              <span className="flex items-center gap-1">
                <BsFillPlayFill className="text-2xl" /> Trailer
              </span>
            </Button>
            <Button
              href={`/details/${media === "movie" ? "movie" : "tv-show"}/${
                bannerItem.id
              }`}
              intent={"translucent"}
              size={"small"}
            >
              <span className="flex h-full items-center gap-1">
                <AiOutlineInfoCircle className="text-xl" /> More Info
              </span>
            </Button>
          </div>
        </header>

        <span className="lr-overlay absolute inset-0 max-w-3xl"></span>
        <span className="bt-overlay-lg absolute bottom-0 left-0 right-0 h-[14.7vw]"></span>
      </div>

      <BannerImage
        alt={`Image for movie ${title}`}
        backdropUrl={`https://image.tmdb.org/t/p/original/${bannerItem.backdrop_path}`}
        posterUrl={`https://image.tmdb.org/t/p/original/${bannerItem.poster_path}`}
      />
    </section>
  );
};

export default BannerSection;
