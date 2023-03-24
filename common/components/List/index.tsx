import ListImage from "./ListImage";
import LoadingImage from "./LoadingImage";

export type Props = {
  items: {
    postImg: string;
    title: string;
    avgRatings: number;
    totalRatings: number;
  }[];
};

const ImageList = ({ items }: Props) => {
  const loadingCardCount = 20;

  return (
    <div className="group/carousel relative overflow-hidden">
      <ul
        onDrag={console.log}
        className="
          grid grid-cols-2 gap-3
          sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8
          2xl:gap-6
        "
      >
        {items.length
          ? items.map((movie) => (
              <li key={movie.postImg} className={"w-full"}>
                <ListImage movie={movie} />
              </li>
            ))
          : Array(loadingCardCount)
              .fill(0)
              .map((_, index) => (
                <li key={index} className={"shrink-0"}>
                  <LoadingImage />
                </li>
              ))}
      </ul>
    </div>
  );
};

export default ImageList;
