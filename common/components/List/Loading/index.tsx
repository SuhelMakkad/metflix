import ImageListWrapper from "../Wrapper";

const LoadingImages = ({ loadingCardCount = 20 }) => {
  return (
    <ImageListWrapper>
      {Array(loadingCardCount)
        .fill(0)
        .map((_, index) => (
          <li key={index} className={"shrink-0"}>
            <div className="aspect-[2/3] w-40 shrink-0 animate-pulse bg-stone-900 md:w-44 lg:w-48 2xl:w-56" />
          </li>
        ))}
    </ImageListWrapper>
  );
};

export default LoadingImages;
