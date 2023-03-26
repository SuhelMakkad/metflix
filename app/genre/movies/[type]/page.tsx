import { MOVIE_TYPES } from "@/tmdb/constants";

import MoviesList from "@/components/ImageList/MoviesList";
import type { MovieType } from "@/tmdb/types/movie";

import { capitalizeSentence } from "@/utils";

export async function generateMetadata({ params }: Props) {
  const { type } = params;
  const typeName = capitalizeSentence(type.replaceAll("_", " "));
  const title = `${typeName} Movies - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `A list of the ${typeName} Movies at the moment`,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
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
