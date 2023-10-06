import { getTVShow, getTVShowsList } from "@/tmdb/lib/tv";
import { getCredits } from "@/tmdb/lib";

import DetailsBanner from "@/components/DetailsBanner";
import TVShowsCarousel from "@/components/ImageCarousel/TVShowsCarousel";
import type { Props as TVShowsCarouselProp } from "@/components/ImageCarousel/TVShowsCarousel";
import SectionHeading from "@/components/SectionHeading";
import ImageCarousel from "@/components/Carousel";

import { capitalizeSentence } from "@/utils";
import { generateSiteMetadata } from "@/utils/siteMetadata";

export type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;

  const tvShow = await getTVShow(id);

  const typeName = capitalizeSentence(tvShow?.name ?? "");
  const title = `${typeName} - Metflix`;
  const description = tvShow?.overview.slice(0, 150);
  const images = [
    {
      url: `https://image.tmdb.org/t/p/w500${tvShow?.backdrop_path}`,
      width: 500,
      height: 281,
    },
    {
      url: `https://image.tmdb.org/t/p/w500${tvShow?.poster_path}`,
      width: 500,
      height: 750,
    },
  ];

  return generateSiteMetadata({
    title,
    description,
    images,
  });
}

export default async function MoviesPage({ params }: Props) {
  const { id } = params;

  const tvShow = await getTVShow(id);
  if (!tvShow) throw new Error("No tvShow Found!");

  const credits = await getCredits(id, "movie");
  const castList = credits?.cast || [];

  const tvShows = await getTVShowsList(["recommendations", "similar"], id);

  const tsShowsCarousel: TVShowsCarouselProp[] = [
    {
      title: "Similar TV Shows",
      tvShows: tvShows.similar,
    },
    {
      title: "Recommended TV Shows",
      tvShows: tvShows.recommendations,
    },
  ];

  return (
    <>
      <DetailsBanner bannerItem={tvShow} media={"tv"} />

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

        {!!tvShow.seasons.length && (
          <li>
            <section>
              <SectionHeading> Seasons </SectionHeading>

              <ImageCarousel
                items={tvShow.seasons.map((season) => ({
                  id: season.id,
                  postImg: season.poster_path
                    ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                    : "",
                  title: season.name,
                  details: (
                    <div className="flex items-center gap-1 text-sm text-stone-200">
                      {new Date(season.air_date).getFullYear()}
                      {" · "}
                      {season.episode_count} Episodes
                    </div>
                  ),
                }))}
              />
            </section>
          </li>
        )}

        {tsShowsCarousel.map((tvShowCarousel, index) => (
          <li key={index}>
            <TVShowsCarousel
              key={index}
              title={tvShowCarousel.title}
              href={tvShowCarousel.href}
              tvShows={tvShowCarousel.tvShows}
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
  return [{ id: "1396" }];
}
