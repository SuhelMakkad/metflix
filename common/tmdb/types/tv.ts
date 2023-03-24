import { TV_TYPES } from "../constants/constants";

export type TVType = (typeof TV_TYPES)[number];

export type TVShow = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  origin_country: string[];
  name: string;
  original_name: string;
};

export type TVShowsRes = {
  page: number;
  results: TVShows;
  total_pages: number;
  total_results: number;
};

export type TVShows = TVShow[];
