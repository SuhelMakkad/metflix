import ListImage from "./ListImage";
import LoadingImage from "./Loading";
import ImageListWrapper from "./Wrapper";

export type Props = {
  items: {
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
        <li key={movie.postImg} className={"w-full"}>
          <ListImage movie={movie} />
        </li>
      ))}
    </ImageListWrapper>
  );
};

export default ImageList;
