import ListImage from "./ListImage";
import ImageListWrapper from "./Wrapper";

export type Props = {
  items: {
    key: number | string;
    postImg: string;
    href?: string;
    title: string;
    avgRatings?: number;
    totalRatings?: number;
    details?: React.ReactElement;
    header?: React.ReactElement;
  }[];
};

const ImageList = ({ items }: Props) => {
  if (!items || !items.length) return <span />;

  return (
    <ImageListWrapper>
      {items.map((movie) => (
        <li key={movie.key} className={"w-full"}>
          <ListImage movie={movie} />
        </li>
      ))}
    </ImageListWrapper>
  );
};

export default ImageList;
