import { Movie } from "@/api/types";
import Image from "next/image";

export type Props = {
  movie: Movie;
};

const BannerSection = ({ movie }: Props) => {
  return (
    <section className="absolute left-0 top-0 right-0 -z-50 max-h-[70rem] overflow-hidden">
      <header className="absolute bottom-1/3 z-10 max-w-2xl px-8">
        <h2 className="mb-4 text-4xl font-bold">
          {movie.original_title ?? movie.title}
        </h2>
        <p className="text-stone-200">{movie.overview}</p>
      </header>

      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={`Image for movie ${movie.original_title}`}
          className="w-full object-cover"
          height={1152}
          width={2048}
          property={"true"}
        />
        <div className="bt-overlay absolute"></div>
      </div>
      <div className="lr-overlay absolute max-w-2xl "></div>
    </section>
  );
};

export default BannerSection;
