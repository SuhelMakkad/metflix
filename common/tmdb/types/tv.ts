import {
  Genre,
  GenreIds,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from ".";
import { TV_TYPES } from "../constants";

export type TVType = (typeof TV_TYPES)[number];

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type ShowCreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path?: string;
};

export type LastEpisodeToAir = {
  air_date: string;
  episode_number: number;
  id: 1551830;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path?: string;
  vote_average: number;
  vote_count: number;
};

export type Network = {
  name: string;
  id: number;
  logo_path?: string;
  origin_country: string;
};

export type TVShowDetails = {
  backdrop_path?: string;
  created_by: ShowCreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type TVShow = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: GenreIds;
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
