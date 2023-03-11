import CarouselImage from "./CarouselImage";

export type Props = {
  movies: {
    postImg: string;
    title: string;
    avgRatings: number;
    totalRatings: number;
  }[];
};

const ImageCarousel = ({ movies }: Props) => {
  return (
    <ul className="scroll-hidden flex flex-none gap-4 overflow-x-auto">
      {movies.map((movie) => (
        <li key={movie.postImg} className={"shrink-0"}>
          <CarouselImage movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default ImageCarousel;
