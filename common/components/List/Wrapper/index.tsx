export type Props = {
  children: React.ReactNode;
};

const ImageListWrapper = ({ children }: Props) => {
  return (
    <div className="group/carousel relative overflow-hidden">
      <ul
        className="
          grid grid-cols-2 gap-3
          sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8
          2xl:gap-6
        "
      >
        {children}
      </ul>
    </div>
  );
};

export default ImageListWrapper;
