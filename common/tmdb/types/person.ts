import type { Media } from ".";
import type { Movie } from "./movie";
import type { TVShow } from "./tv";

export type Gender = 0 | 1 | 2 | 3;

export type Person = {
  id: number;
  profile_path: string;
  adult: boolean;
  name: string;
  known_for: (Movie | TVShow) & { media_type: Media };
};

export type PersonDetails = {
  birthday: string;
  known_for_department: string;
  deathday?: string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: Gender;
  biography: string;
  popularity: number;
  place_of_birth?: string;
  profile_path?: string;
  adult: boolean;
  imdb_id: string;
  homepage?: string;
};

export type PersonCastExtra = {
  character: string;
  credit_id: string;
  order: 0;
};

export type PersonCast = ((
  | (Movie & {
      media_type: "movie";
    })
  | (TVShow & {
      media_type: "tv";
    })
) &
  PersonCastExtra)[];

export type PersonCastRes = {
  id: number;
  cast: PersonCast;
};

export type PersonImage = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type PersonImageRes = {
  id: number;
  profiles: PersonImage[];
};
