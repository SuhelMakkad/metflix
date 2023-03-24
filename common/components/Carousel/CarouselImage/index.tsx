import Link from "next/link";
import Image from "next/image";

import { AiFillStar } from "react-icons/ai";

export type Props = {
  movie: {
    postImg: string;
    title: string;
    href: string;
    avgRatings: number;
    totalRatings: number;
  };
};

const CarouselImage = ({ movie }: Props) => {
  return (
    <Link href={movie.href ?? "/"} className={"group/image-card"}>
      <div className="relative transition-transform duration-300 group-hover/image-card:scale-105">
        <Image
          src={movie.postImg}
          height={750}
          width={500}
          alt={`Poster Image for ${movie.title}`}
          className="w-40 md:w-44 lg:w-48 2xl:w-56"
        />

        <div
          className="
            bt-overlay-lg absolute bottom-0 left-0 right-0 origin-bottom 
            bg-black px-3 pt-10 pb-3 opacity-0 transition-opacity
            duration-300 group-hover/image-card:opacity-100
          "
        >
          <span className="text-lg font-semibold leading-tight">
            {movie.title}
          </span>
          <br />
          <span className="flex items-center gap-1 text-sm text-stone-200">
            {movie.avgRatings.toFixed(1)} <AiFillStar className="mr-2" />{" "}
            {movie.totalRatings.toLocaleString()} Votes
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CarouselImage;
