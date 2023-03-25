import ListImage from "./ListImage";
import ImageListWrapper from "./Wrapper";

export type Props = {
  items: {
    id: number | string;
    postImg: string;
    href: string;
    title: string;
    avgRatings: number;
    totalRatings: number;
  }[];
};

const ImageList = ({ items }: Props) => {
  if (!items || !items.length) return <span />;

  return (
    <ImageListWrapper>
      {items.map((movie) => (
        <li key={movie.id} className={"w-full"}>
          <ListImage movie={movie} />
        </li>
      ))}
    </ImageListWrapper>
  );
};

export default ImageList;
