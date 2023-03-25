import BannerSection from "@/components/BannerSection";
import MoviesCarousel from "@/components/ImageCarousel/MoviesCarousel";

import type { Props as MoviesCarouselProp } from "@/components/ImageCarousel/MoviesCarousel";

export async function generateMetadata() {
  const title = `Movies - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `A list of the Movies`,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function MoviesPage() {
  const moviesCarousel: MoviesCarouselProp[] = [
    {
      title: "Trending Today",
      href: "/genre/movies/trending",
      type: "trending",
    },
    {
      title: "Now Playing",
      href: "/genre/movies/now_playing",
      type: "now_playing",
    },
    {
      title: "Upcoming",
      href: "/genre/movies/upcoming",
      type: "upcoming",
    },
    {
      title: "Popular",
      href: "/genre/movies/popular",
      type: "popular",
    },
    {
      title: "Top Rated",
      href: "/genre/movies/top_rated",
      type: "top_rated",
    },
  ];
  return (
    <>
      <BannerSection media="movie" type="popular" />

      <ul className="flex flex-col gap-[3vw]">
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
      </ul>
    </>
  );
}
