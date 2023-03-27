import { getCredits } from "@/tmdb/lib";
import { getMovie, getMoviesList } from "@/tmdb/lib/movie";

import DetailsBanner from "@/components/DetailsBanner";
import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";
import MoviesCarousel from "@/components/ImageCarousel/MoviesCarousel";
import type { Props as MoviesCarouselProp } from "@/components/ImageCarousel/MoviesCarousel";

import { capitalizeSentence } from "@/utils";

export type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;

  const movie = await getMovie(id);

  const typeName = capitalizeSentence(movie?.title ?? "");
  const title = `${typeName} - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: movie?.overview.slice(0, 150),
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function MoviesPage({ params }: Props) {
  const { id } = params;

  const movie = await getMovie(id);
  if (!movie) throw new Error("No Movie Found!");

  const credits = await getCredits(id, "movie");
  const castList = credits?.cast || [];

  const movies = await getMoviesList(["recommendations", "similar"], id);

  const moviesCarousel: MoviesCarouselProp[] = [
    {
      title: "Similar Movies",
      movies: movies.similar,
    },
    {
      title: "Recommended Movies",
      movies: movies.recommendations,
    },
  ];

  return (
    <>
      <DetailsBanner bannerItem={movie} media={"movie"} />

      <ul className="flex flex-col gap-5 lg:gap-7">
        {!!castList.length && (
          <li>
            <section>
              <SectionHeading> Meet the Cast </SectionHeading>

              <ImageCarousel
                items={castList.map((cast) => ({
                  id: cast.id,
                  postImg: cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : "",
                  title: cast.name,
                  href: `/details/person/${cast.id}`,
                  details: cast.character ? (
                    <span className="text-sm italic text-stone-200">
                      As {cast.character}
                    </span>
                  ) : (
                    <></>
                  ),
                }))}
              />
            </section>
          </li>
        )}

        {moviesCarousel.map((movieCarousel, index) => (
          <li key={index}>
            <MoviesCarousel
              key={index}
              title={movieCarousel.title}
              href={movieCarousel.href}
              movies={movieCarousel.movies}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  const tempIds = [603692];
  return tempIds.map((id) => ({
    id,
  }));
}
