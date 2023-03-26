import BannerImage from "../Image";

export type Props = {
  title: string;
  backdropPath?: string;
  posterPath?: string;
  alt: string;
  children: React.ReactNode;
};

const BannerWrapper = ({
  title,
  backdropPath,
  posterPath,
  alt,
  children,
}: Props) => {
  return (
    <section className="relative -mx-3 max-h-[85vh] overflow-hidden md:-mx-4 lg:-mx-6 2xl:-mx-8">
      <div className="absolute inset-0">
        <header className="absolute left-0 right-0 bottom-1/3 z-10 w-[42rem] max-w-full px-8">
          <h1 className="mb-2 text-3xl font-bold drop-shadow-[0_25px_25px_rgb(0,0,0)] md:text-4xl md:drop-shadow-none lg:text-5xl xl:text-6xl">
            {title}
          </h1>

          {children}
        </header>

        <span className="lr-overlay absolute inset-0 max-w-3xl"></span>
        <span className="bt-overlay-lg absolute bottom-0 left-0 right-0 h-[14.7vw]"></span>
      </div>

      <BannerImage
        alt={alt}
        backdropUrl={
          backdropPath
            ? `https://image.tmdb.org/t/p/original/${backdropPath}`
            : ""
        }
        posterUrl={
          posterPath ? `https://image.tmdb.org/t/p/original/${posterPath}` : ""
        }
      />
    </section>
  );
};

export default BannerWrapper;
