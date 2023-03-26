import {
  getPerson,
  getPersonCredits,
  getPersonImages,
} from "@/tmdb/lib/person";

import ImageCarousel from "@/components/Carousel";
import ImageList from "@/components/List";
import PersonDetails from "@/components/PersonDetails";
import SectionHeading from "@/components/SectionHeading";

import { capitalizeSentence } from "@/utils";

export type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;

  const person = await getPerson(id);

  const typeName = capitalizeSentence(person?.name ?? "");
  const title = `${typeName} - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: person?.biography.slice(0, 150),
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function PersonsPage({ params }: Props) {
  const { id } = params;

  const person = await getPerson(id);
  if (!person) throw new Error("No person Found!");

  const creditsPromise = getPersonCredits(id);
  const personImagesResPromise = getPersonImages(id);
  const [creditsRes, personImagesRes] = await Promise.allSettled([
    creditsPromise,
    personImagesResPromise,
  ]);

  const credits = creditsRes.status === "fulfilled" ? creditsRes.value : null;
  const personImages =
    personImagesRes.status === "fulfilled" ? personImagesRes.value : null;

  const castList = credits?.cast || [];
  const profiles = personImages?.profiles || [];

  return (
    <div className="mt-20">
      <PersonDetails person={person} />

      <ul className="mt-10 flex flex-col gap-5 lg:gap-7">
        <li>
          {!!profiles.length && (
            <section>
              <SectionHeading> More Images of {person.name} </SectionHeading>

              <ImageCarousel
                items={profiles.map((profile, index) => ({
                  id: index,
                  totalRatings: profile.vote_count,
                  avgRatings: profile.vote_average,
                  postImg: profile.file_path
                    ? `https://image.tmdb.org/t/p/w500${profile.file_path}`
                    : "",
                }))}
              />
            </section>
          )}
        </li>

        <li>
          {!!castList.length && (
            <section>
              <SectionHeading> As Seen in </SectionHeading>

              <ImageList
                items={castList.map((cast) => ({
                  key: cast.id,
                  postImg: cast.poster_path
                    ? `https://image.tmdb.org/t/p/w500${cast.poster_path}`
                    : "",
                  title: cast.media_type === "movie" ? cast.title : cast.name,
                  avgRatings: cast.vote_average,
                  totalRatings: cast.vote_count,
                  href: `/details/${
                    cast.media_type === "movie" ? "movie" : "tv-show"
                  }/${cast.id}`,
                }))}
              />
            </section>
          )}
        </li>
      </ul>
    </div>
  );
}

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  const tempIds = [62];
  return tempIds.map((id) => ({
    id,
  }));
}
