import BannerSection from "@/components/BannerSection";
import MoviesCarousel, {
  Props as MoviesCarouselProp,
} from "@/components/ImageCarousel/MoviesCarousel";
import TVShowsCarousel, {
  Props as TVShowsCarouselProp,
} from "@/components/ImageCarousel/TVShowsCarousel";

export const metadata = {
  title: "Movies - Metflix",
  description: "Generated by create next app",
};

export default async function MoviesPage() {
  const moviesCarousel: MoviesCarouselProp[] = [
    {
      title: "Trending Movies",
      href: "/",
      type: "trending",
    },
    {
      title: "Top Rated Movies",
      href: "/",
      type: "top_rated",
    },
  ];

  const tvShowsCarousel: TVShowsCarouselProp[] = [
    {
      title: "Trending TV Shoes",
      href: "/",
      type: "trending",
    },
    {
      title: "Top Rated TV Shoes",
      href: "/",
      type: "top_rated",
    },
  ];
  return (
    <>
      <BannerSection media="movie" type="trending" />

      <ul className="flex flex-col gap-[3vw]">
        {moviesCarousel.map((movieCarousel, index) => (
          <li>
            <MoviesCarousel
              key={index}
              title={movieCarousel.title}
              href={movieCarousel.href}
              type={movieCarousel.type}
            />
          </li>
        ))}

        {tvShowsCarousel.map((movieCarousel, index) => (
          <li key={index}>
            <TVShowsCarousel
              title={movieCarousel.title}
              href={movieCarousel.href}
              type={movieCarousel.type}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
