"use client";

import { useEffect, useState } from "react";

import { getTrendingMovies } from "@/api/tmbd";
import { Movie } from "@/api/types";

import Image from "next/image";

const BannerSection = () => {
  const [bannerMovie, setBannerMovie] = useState<Movie>();

  useEffect(() => {
    const setMovies = async () => {
      const res = await getTrendingMovies();

      if (!res) {
        throw Error("Can not get movies");
      }
      const { results: movies } = res;
      const rndInt = Math.floor(Math.random() * (movies.length + 1));

      setBannerMovie(movies[rndInt]);
    };

    setMovies();
  }, []);

  if (!bannerMovie) return <p>Loading...</p>;

  return (
    <section className="relative -mx-8 max-h-[85vh] overflow-hidden">
      <div className="absolute inset-0 px-8">
        <header className="absolute bottom-1/3 z-10 max-w-2xl">
          <h2 className="mb-2 text-3xl font-bold drop-shadow-[0_25px_25px_rgb(0,0,0)] md:text-4xl md:drop-shadow-none lg:text-5xl xl:text-6xl">
            {bannerMovie.original_title ?? bannerMovie.title}
          </h2>
          <p className="drop-shadow-[0_25px_25px_rgb(0 0,0)] text-stone-50 md:text-lg md:drop-shadow-none lg:text-xl">
            {bannerMovie.overview.length > 150
              ? `${bannerMovie.overview.slice(0, 150)}...`
              : bannerMovie.overview}
          </p>
        </header>

        <span className="lr-overlay absolute inset-0 max-w-3xl"></span>
        <span className="bt-overlay-lg absolute bottom-0 left-0 right-0 h-[14.7vw]"></span>
      </div>

      <Image
        src={`https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path}`}
        alt={`Image for movie ${bannerMovie.original_title}`}
        className="-z-50 min-h-[30rem] w-full object-cover"
        height={1152}
        width={2048}
        property={"true"}
      />
    </section>
  );
};

export default BannerSection;
