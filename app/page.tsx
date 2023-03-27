import BannerSection from "@/components/BannerSection";
import MoviesCarousel from "@/components/ImageCarousel/MoviesCarousel";
import type { Props as MoviesCarouselProp } from "@/components/ImageCarousel/MoviesCarousel";
import TVShowsCarousel from "@/components/ImageCarousel/TVShowsCarousel";
import type { Props as TVShowsCarouselProp } from "@/components/ImageCarousel/TVShowsCarousel";
import { getMovies } from "@/tmdb/lib/movie";

export async function generateMetadata() {
  const title = `Home - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `Metflix home page`,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function MoviesPage() {
  const trendingMovies = (await getMovies("trending"))?.results ?? [];

  const moviesCarousel: MoviesCarouselProp[] = [
    {
      title: "Trending Movies",
      href: "/genre/movies/trending",
      type: "trending",
    },
    {
      title: "Top Rated Movies",
      href: "/genre/movies/top_rated",
      type: "top_rated",
    },
  ];

  const tvShowsCarousel: TVShowsCarouselProp[] = [
    {
      title: "Trending TV Shows",
      href: "/genre/tv-shows/trending",
      type: "trending",
    },
    {
      title: "Top Rated TV Shows",
      href: "/genre/tv-shows/top_rated",
      type: "top_rated",
    },
  ];
  return (
    <>
      <BannerSection items={trendingMovies} />

      <ul className="flex flex-col gap-5 lg:gap-7">
        {moviesCarousel.map((movieCarousel, index) => (
          <li key={index}>
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

export const revalidate = 86400;
