import Image from "next/image";

import { getVideoUrl } from "@/tmdb/api/video";

import type { Media } from "@/tmdb/types";
import type { MovieDetails } from "@/tmdb/types/movie";
import type { TVShowDetails } from "@/tmdb/types/tv";

import { BsFillPlayFill } from "react-icons/bs";

import LoadingBanner from "./Loading";
import BannerWrapper from "../BannerSection/Wrapper";
import Button from "../Button";

export type Props = {
  bannerItem: MovieDetails | TVShowDetails;
  media: Media;
};

const DetailsBanner = ({ bannerItem, media }: Props) => {
  const title = bannerItem
    ? "title" in bannerItem
      ? bannerItem.title ?? bannerItem.original_title
      : "name" in bannerItem
      ? bannerItem.name ?? bannerItem.original_name
      : ""
    : "";

  if (!bannerItem) return <LoadingBanner />;

  return (
    <BannerWrapper
      alt={`Image for ${media} ${title}`}
      backdropPath={bannerItem.backdrop_path}
      posterPath={bannerItem.poster_path}
      title={title}
    >
      <ul className="flex gap-1">
        {bannerItem.genres.map((genre, index) => (
          <li key={genre.id}>
            {genre.name}
            {index !== bannerItem.genres.length - 1 && ","}
          </li>
        ))}
      </ul>

      <p className="drop-shadow-[0_25px_25px_rgb(0 0,0)] mt-4 text-stone-50 md:text-lg md:drop-shadow-none lg:text-xl">
        {bannerItem.overview.length > 150
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
      </div>
    </BannerWrapper>
  );
};

export default DetailsBanner;
