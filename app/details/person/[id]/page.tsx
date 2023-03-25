import ImageCarousel from "@/components/Carousel";
import ImageList from "@/components/List";
import PersonDetails from "@/components/PersonDetails";
import SectionHeading from "@/components/SectionHeading";
import { getPerson, getPersonCredits, getPersonImages } from "@/lib/tmdb";

export const metadata = {
  title: "Person - Metflix",
  description: "Generated by create next app",
};

export type Props = {
  params: {
    id: string;
  };
};

export default async function PersonsPage({ params }: Props) {
  const { id } = params;

  const person = await getPerson(id);
  if (!person) throw new Error("No person Found!");

  const credits = await getPersonCredits(id);
  const castList = credits?.cast || [];

  const personImagesRes = await getPersonImages(id);
  const profiles = personImagesRes?.profiles || [];

  return (
    <div className="mt-20">
      <PersonDetails person={person} />
      <ul className="mt-10 flex flex-col gap-[3vw]">
        <li>
          {!!castList.length && (
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
