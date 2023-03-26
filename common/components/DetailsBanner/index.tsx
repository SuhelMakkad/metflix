import Image from "next/image";

import { getVideoUrl } from "@/tmdb/api/video";

import type { Media } from "@/tmdb/types";
import type { MovieDetails } from "@/tmdb/types/movie";
import type { TVShowDetails } from "@/tmdb/types/tv";

import { BsFillPlayFill } from "react-icons/bs";

import LoadingBanner from "./Loading";
import Button from "../Button";
import ImageWithFallback from "../ImageWithFallback";
import BannerImage from "../BannerSection/Image";

export type Props = {
  item: MovieDetails | TVShowDetails;
  media: Media;
};

const DetailsBanner = ({ item, media }: Props) => {
  const title = item
    ? "title" in item
      ? item.title ?? item.original_title
      : "name" in item
      ? item.name ?? item.original_name
      : ""
    : "";

  if (!item) return <LoadingBanner />;

  return (
    <section className="relative -mx-3 max-h-[85vh] overflow-hidden md:-mx-4 lg:-mx-6 2xl:-mx-8">
      <div className="absolute inset-0 px-8">
        <header className="absolute left-0 right-0 bottom-1/3 z-10 w-[42rem] max-w-full px-8">
          <h2 className="mb-2 text-3xl font-bold drop-shadow-[0_25px_25px_rgb(0,0,0)] md:text-4xl md:drop-shadow-none lg:text-5xl xl:text-6xl">
            {title}
          </h2>

          <ul className="flex gap-1">
            {item.genres.map((genre, index) => (
              <li key={genre.id}>
                {genre.name}
                {index !== item.genres.length - 1 && ","}
              </li>
            ))}
          </ul>

          <p className="drop-shadow-[0_25px_25px_rgb(0 0,0)] mt-4 text-stone-50 md:text-lg md:drop-shadow-none lg:text-xl">
            {item.overview.length > 150
              ? `${item.overview.slice(0, 150)}...`
              : item.overview}
          </p>

          <div className="mt-5 flex items-stretch gap-2">
            <Button
              size={"small"}
              target="_blank"
              href={getVideoUrl(item.id, media)}
            >
              <span className="flex items-center gap-1">
                <BsFillPlayFill className="text-2xl" /> Trailer
              </span>
            </Button>
          </div>
        </header>

        <span className="lr-overlay absolute inset-0 max-w-3xl"></span>
        <span className="bt-overlay-lg absolute bottom-0 left-0 right-0 h-[14.7vw]"></span>
      </div>

      <BannerImage
        alt={`Image for movie ${title}`}
        backdropUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
        posterUrl={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
      />
    </section>
  );
};

export default DetailsBanner;
