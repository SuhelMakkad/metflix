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
  const title = `${typeName} TV Shows | Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `Immerse yourself in the best ${typeName} TV shows on Metflix. From groundbreaking series to beloved classics, discover a diverse lineup of ${typeName} shows. Explore cast details, season breakdowns, and find your next series to binge. Whether you're a genre aficionado or just exploring, Metflix has something for everyone in ${typeName}.`,
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
