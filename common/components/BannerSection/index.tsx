import { Movie } from "@/api/types";
import Image from "next/image";

export type Props = {
  movie: Movie;
};

const BannerSection = ({ movie }: Props) => {
  return (
    <section className="relative -mx-8 overflow-hidden">
      <div className="absolute inset-0 px-8">
        <header className="absolute bottom-1/3 z-10 max-w-2xl">
          <h2 className="mb-2 text-3xl font-bold drop-shadow-[0_25px_25px_rgb(0,0,0)] md:text-4xl md:drop-shadow-none lg:text-5xl xl:text-6xl">
            {movie.original_title ?? movie.title}
          </h2>
          <p className="drop-shadow-[0_25px_25px_rgb(0 0,0)] text-stone-50 md:text-lg md:drop-shadow-none lg:text-xl">
            {movie.overview.length > 150
              ? `${movie.overview.slice(0, 150)}...`
              : movie.overview}
          </p>
        </header>

        <span className="lr-overlay absolute inset-0 max-w-3xl"></span>
        <span className="bt-overlay-lg absolute bottom-0 left-0 right-0 h-[14.7vw]"></span>
      </div>

      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={`Image for movie ${movie.original_title}`}
        className="-z-50 w-full object-cover"
        height={1152}
        width={2048}
        property={"true"}
      />
    </section>
  );
};

export default BannerSection;
