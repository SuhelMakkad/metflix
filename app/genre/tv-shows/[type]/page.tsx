import { TV_TYPES } from "@/tmdb/constants";

import TVShowsList from "@/components/ImageList/TVShowsList";
import type { TVType } from "@/tmdb/types/tv";

import { capitalizeSentence } from "@/utils";

export type Props = {
  params: {
    type: TVType;
  };
};

export async function generateMetadata({ params }: Props) {
  const { type } = params;
  const typeName = capitalizeSentence(type.replaceAll("_", " "));
  const title = `${typeName} TV Shows - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `A list of the ${typeName} TV Shows at the moment`,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function MoviesPage({ params }: Props) {
  const { type } = params;

  return (
    <div className="mt-20">
      <TVShowsList
        title={`${type.replaceAll("_", " ")} TV Shows`}
        type={type}
      />
    </div>
  );
}

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return TV_TYPES.map((type) => ({
    type,
  }));
}
