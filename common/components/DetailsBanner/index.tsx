import Image from "next/image";

import { getVideoUrl } from "@/tmdb/api/video";

import type { MovieDetails } from "@/tmdb/types/movie";
import type { Media } from "@/tmdb/types";

import { BsFillPlayFill } from "react-icons/bs";

import LoadingBanner from "./Loading";
import Button from "../Button";
import { AiFillStar } from "react-icons/ai";

export type Props = {
  item: MovieDetails;
  media: Media;
};

const DetailsBanner = ({ item, media }: Props) => {
  // const title = item
  //   ? "title" in item
  //     ? item.title ?? item.original_title
  //     : "name" in item
  //     ? item.name ?? item.original_name
  //     : ""
  //   : "";
  const title = item.title ?? item.original_title;

  if (!item) return <LoadingBanner />;

  return (
    <section className="relative -mx-8 max-h-[85vh] overflow-hidden">
      <div className="absolute inset-0 px-8">
        <header className="absolute bottom-1/3 z-10 max-w-2xl">
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

      <Image
        src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
        alt={`Image for movie ${title}`}
        className="-z-50 hidden min-h-[30rem] w-full object-cover md:block"
        height={1152}
        width={2048}
        property={"true"}
      />

      <Image
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        alt={`Image for movie ${title}`}
        className="-z-50 block min-h-[30rem] w-full object-cover md:hidden"
        height={1311}
        width={874}
        property={"true"}
      />
    </section>
  );
};

export default DetailsBanner;
