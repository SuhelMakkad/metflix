import type { Movie } from "./movie";
import type { Person } from "./person";
import type { TVShow } from "./tv";

export type MultiSearchRes = {
  page: number;
  total_results: number;
  total_pages: number;
  results: (
    | (Person & { media_type: "person" })
    | (Movie & { media_type: "movie" })
    | (TVShow & { media_type: "tv" })
  )[];
};
