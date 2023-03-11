import { Movie } from "@/api/types";
import Image from "next/image";

export type Props = {
  movie: Movie;
};

const BannerSection = ({ movie }: Props) => {
  return (
    <>
      <section className="absolute left-0 top-0 right-0 -z-50 max-h-[70rem] overflow-hidden">
        <header className="absolute bottom-1/3 z-10 max-w-2xl px-8 ">
          <h2 className="mb-2 text-3xl font-bold drop-shadow-[0_25px_25px_rgb(0,0,0)] md:text-4xl md:drop-shadow-none lg:text-5xl xl:text-6xl">
            {movie.original_title ?? movie.title}
          </h2>
          <p className="drop-shadow-[0_25px_25px_rgb(0 0,0)] text-stone-50 md:text-lg md:drop-shadow-none lg:text-xl">
            {movie.overview.length > 150
              ? `${movie.overview.slice(0, 150)}...`
              : movie.overview}
          </p>
        </header>

        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={`Image for movie ${movie.original_title}`}
          className="min-h-[40rem] w-full object-cover"
          height={1152}
          width={2048}
          property={"true"}
        />

        <div className="lr-overlay absolute max-w-2xl "></div>
        <div className="bt-overlay-lg absolute"></div>
      </section>
    </>
  );
};

export default BannerSection;
