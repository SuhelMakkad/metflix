import { getTrendingMovies } from "@/api/tmbd";

import BannerSection from "@/components/BannerSection";
import TrendingNowMovies from "@/components/Movies/TrendingNow";
import TopRatedMovies from "@/components/Movies/TopRatedMovies";
import TopRatedTVShows from "@/components/Movies/TopRatedTVShows";

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

        <TopRatedMovies />

        <TopRatedTVShows />
      </div>
    </>
  );
}
