import { MOVIE_TYPES } from "@/tmdb/constants";

import MoviesList from "@/components/ImageList/MoviesList";
import type { MovieType } from "@/tmdb/types/movie";

import { capitalizeSentence } from "@/utils";
import { getMetadata } from "@/utils/seo/metadata";

export async function generateMetadata({ params }: Props) {
  const { type } = params;
  const typeName = capitalizeSentence(type.replaceAll("_", " "));

  return getMetadata({
    title: `${typeName} Movies | Metflix`,
    description: `Explore the best of ${typeName} on Metflix. Browse a wide selection of ${typeName} movies and TV shows, featuring classic hits and the latest releases. Get all the information you need, from cast details to episode guides, and find your new favorite ${typeName} title today!`,
  });
}

export type Props = {
  params: {
    type: MovieType;
  };
};

export default async function MoviesPage({ params }: Props) {
  const { type } = params;

  return (
    <div className="mt-20">
      <MoviesList title={`${type.replaceAll("_", " ")} Movies`} type={type} />
    </div>
  );
}

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return MOVIE_TYPES.map((type) => ({
    type,
  }));
}
