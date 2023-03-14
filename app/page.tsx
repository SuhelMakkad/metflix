import BannerSection from "@/components/BannerSection";
import TrendingNowMovies from "@/components/Movies/TrendingNow";
import TopRatedMovies from "@/components/Movies/TopRatedMovies";
import TopRatedTVShows from "@/components/Movies/TopRatedTVShows";

export default async function Home() {
  return (
    <>
      <BannerSection />

      <div className="flex flex-col gap-[3vw]">
        <TrendingNowMovies />

        <TopRatedMovies />

        <TopRatedTVShows />
      </div>
    </>
  );
}
