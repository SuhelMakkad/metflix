import ImageListWrapper from "../Wrapper";

const LoadingImages = ({ loadingCardCount = 20 }) => {
  return (
    <ImageListWrapper>
      {Array(loadingCardCount)
        .fill(0)
        .map((_, index) => (
          <li key={index} className={"shrink-0"}>
            <div className="aspect-[2/3] animate-pulse bg-stone-900 " />
          </li>
        ))}
    </ImageListWrapper>
  );
};

export default LoadingImages;
