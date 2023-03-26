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

import { getRandomInt } from "@/utils";
import BannerWrapper from "./Wrapper";

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
    <BannerWrapper
      alt={`Image for ${media} ${title}`}
      backdropPath={bannerItem.backdrop_path}
      posterPath={bannerItem.poster_path}
      title={title}
    >
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
    </BannerWrapper>
  );
};

export default BannerSection;
