import { getTrendingMovies } from "@/api/tmbd";
import BannerSection from "@/components/BannerSection";
import ImageCarousel from "@/components/Carousel";
import TrendingNowMovies from "@/components/Movies/TrendingNow";
import SectionHeading from "@/components/SectionHeading";

export default async function Home() {
  const res = await getTrendingMovies();

  if (!res) {
    throw Error("Can not get movies");
  }

  const { results: movies } = res;

  const rndInt = Math.floor(Math.random() * 10 + 1);

  return (
    <>
      <BannerSection movie={movies[rndInt]} />

      <div className="flex flex-col gap-8">
        <TrendingNowMovies />

        <section>
          <header>
            <SectionHeading> Trending Now</SectionHeading>
          </header>

          <ImageCarousel
            movies={movies.map((movie) => ({
              postImg: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              title: movie.title ?? movie.original_title,
              avgRatings: movie.vote_average,
              totalRatings: movie.vote_count,
            }))}
          />
        </section>

        <section>
          <header>
            <SectionHeading> Trending Now</SectionHeading>
          </header>

          <ImageCarousel
            movies={movies.map((movie) => ({
              postImg: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              title: movie.title ?? movie.original_title,
              avgRatings: movie.vote_average,
              totalRatings: movie.vote_count,
            }))}
          />
        </section>
      </div>
    </>
  );
}
