import ImageWithFallback from "../ImageWithFallback";

import type { PersonDetails } from "@/tmdb/types/person";

export type Props = {
  person: PersonDetails;
};

const PersonDetails = ({ person }: Props) => {
  return (
    <section className="mx-auto flex max-w-7xl gap-8">
      <ImageWithFallback
        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
        height={750}
        width={500}
        alt={`Profile Image of ${person.name}`}
        className="h-max w-60"
      />

      <div>
        <h1 className="text-2xl font-semibold">{person.name}</h1>
        <div className="mt-1 text-sm italic text-stone-300">
          <span>{person.birthday}</span>
          {!!person.deathday && ` - ${person.deathday}`}
        </div>
        <p className="mt-2 leading-relaxed text-stone-200">
          {person.biography}
        </p>
      </div>
    </section>
  );
};

export default PersonDetails;
