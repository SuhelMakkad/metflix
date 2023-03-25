import type { Media } from ".";
import type { Movie } from "./movie";
import type { TVShow } from "./tv";

export type Person = {
  id: number;
  profile_path: string;
  adult: boolean;
  name: string;
  known_for: (Movie | TVShow) & { media_type: Media };
};
