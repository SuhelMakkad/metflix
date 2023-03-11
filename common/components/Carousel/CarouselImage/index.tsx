import Link from "next/link";
import Image from "next/image";

import { AiFillStar } from "react-icons/ai";

export type Props = {
  movie: {
    postImg: string;
    title: string;
    avgRatings: number;
    totalRatings: number;
  };
};

const CarouselImage = ({ movie }: Props) => {
  return (
    <Link href={"/"} className={"group"}>
      <div className="relative overflow-hidden transition-transform group-hover:-translate-y-2 group-hover:scale-105">
        <Image
          src={movie.postImg}
          height={750}
          width={500}
          alt={`Poster Image for ${movie.title}`}
          className="w-52"
        />

        <span
          className="
            bt-overlay absolute bottom-0 left-0 right-0 translate-y-full bg-black
            px-3 pt-10 pb-3 transition-transform group-hover:translate-y-0 
        "
        >
          <span className="text-lg font-semibold leading-tight">
            {movie.title}
          </span>
          <br />
          <span className="flex items-center gap-1 text-sm">
            {movie.avgRatings.toFixed(1)} <AiFillStar className="mr-2" />{" "}
            {movie.totalRatings} Votes
          </span>
        </span>
      </div>
    </Link>
  );
};

export default CarouselImage;
