"use client";

import { useEffect, useState } from "react";

import { getTrendingMovies } from "@/api/tmbd";
import { Movie } from "@/api/types";

import Image from "next/image";
import LoadingBanner from "./Loading";

const BannerSection = () => {
  const [bannerItem, setBannerItem] = useState<Movie>();

  useEffect(() => {
    const setMovies = async () => {
      const res = await getTrendingMovies();

      if (!res) {
        throw Error("Can not get movies");
      }
      const { results: movies } = res;
      const rndInt = Math.floor(Math.random() * (movies.length + 1));

      setBannerItem(movies[rndInt]);
    };

    setMovies();
  }, []);

  if (!bannerItem) return <LoadingBanner />;

  return (
    <section className="relative -mx-8 max-h-[85vh] overflow-hidden">
      <div className="absolute inset-0 px-8">
        <header className="absolute bottom-1/3 z-10 max-w-2xl">
          <h2 className="mb-2 text-3xl font-bold drop-shadow-[0_25px_25px_rgb(0,0,0)] md:text-4xl md:drop-shadow-none lg:text-5xl xl:text-6xl">
            {bannerItem.original_title ?? bannerItem.title}
          </h2>
          <p className="drop-shadow-[0_25px_25px_rgb(0 0,0)] text-stone-50 md:text-lg md:drop-shadow-none lg:text-xl">
            {bannerItem.overview.length > 150
              ? `${bannerItem.overview.slice(0, 150)}...`
              : bannerItem.overview}
          </p>
        </header>

        <span className="lr-overlay absolute inset-0 max-w-3xl"></span>
        <span className="bt-overlay-lg absolute bottom-0 left-0 right-0 h-[14.7vw]"></span>
      </div>

      <Image
        src={`https://image.tmdb.org/t/p/original/${bannerItem.backdrop_path}`}
        alt={`Image for movie ${bannerItem.original_title}`}
        className="-z-50 hidden min-h-[30rem] w-full object-cover md:block"
        height={1152}
        width={2048}
        property={"true"}
      />

      <Image
        src={`https://image.tmdb.org/t/p/original/${bannerItem.poster_path}`}
        alt={`Image for movie ${bannerItem.original_title}`}
        className="-z-50 block min-h-[30rem] w-full object-cover md:hidden"
        height={1311}
        width={874}
        property={"true"}
      />
    </section>
  );
};

export default BannerSection;
