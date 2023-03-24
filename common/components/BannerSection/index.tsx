"use client";

import { useEffect, useState, useMemo } from "react";

import Image from "next/image";

import { getMovies, getTVShows, getVideoUrl } from "@/api/tmdb";
import { Movie, Media, TVShow, MovieType, TVType } from "@/api/types";

import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

import LoadingBanner from "./Loading";
import Button from "../Button";

export type Props = {
  media: Media;
  type: TVType | MovieType;
};

const BannerSection = ({ media, type }: Props) => {
  const [bannerItem, setBannerItem] = useState<Movie | TVShow>();

  useEffect(() => {
    const setMovies = async () => {
      const res =
        media === "movie"
          ? await getMovies(type as MovieType)
          : await getTVShows(type as TVType);

      if (!res) {
        throw Error("Can not get movies");
      }
      const { results } = res;
      const rndInt = Math.floor(Math.random() * (results.length + 1));

      setBannerItem(results[rndInt]);
    };

    setMovies();
  }, []);

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

  if (!bannerItem) return <LoadingBanner />;

  return (
    <section className="relative -mx-8 max-h-[85vh] overflow-hidden">
      <div className="absolute inset-0 px-8">
        <header className="absolute bottom-1/3 z-10 max-w-2xl">
          <h2 className="mb-2 text-3xl font-bold drop-shadow-[0_25px_25px_rgb(0,0,0)] md:text-4xl md:drop-shadow-none lg:text-5xl xl:text-6xl">
            {title}
          </h2>
          <p className="drop-shadow-[0_25px_25px_rgb(0 0,0)] text-stone-50 md:text-lg md:drop-shadow-none lg:text-xl">
            {bannerItem.overview.length > 150
              ? `${bannerItem.overview.slice(0, 150)}...`
              : bannerItem.overview}
          </p>

          <div className="mt-5 flex gap-2">
            <Button size={"small"} href={getVideoUrl(bannerItem.id, media)}>
              <span className="flex items-center gap-1">
                <BsFillPlayFill className="text-2xl" /> Play
              </span>
            </Button>
            <Button intent={"translucent"} size={"small"}>
              <span className="flex items-center gap-1">
                <AiOutlineInfoCircle className="text-xl" /> More Info
              </span>
            </Button>
          </div>
        </header>

        <span className="lr-overlay absolute inset-0 max-w-3xl"></span>
        <span className="bt-overlay-lg absolute bottom-0 left-0 right-0 h-[14.7vw]"></span>
      </div>

      <Image
        src={`https://image.tmdb.org/t/p/original/${bannerItem.backdrop_path}`}
        alt={`Image for movie ${title}`}
        className="-z-50 hidden min-h-[30rem] w-full object-cover md:block"
        height={1152}
        width={2048}
        property={"true"}
      />

      <Image
        src={`https://image.tmdb.org/t/p/original/${bannerItem.poster_path}`}
        alt={`Image for movie ${title}`}
        className="-z-50 block min-h-[30rem] w-full object-cover md:hidden"
        height={1311}
        width={874}
        property={"true"}
      />
    </section>
  );
};

export default BannerSection;
