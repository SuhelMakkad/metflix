import {
  Genre,
  GenreIds,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  Status,
} from ".";
import { MOVIE_TYPES } from "../constants";
import { Video } from "./video";

export type MovieType = (typeof MOVIE_TYPES)[number];

export type MovieDetails = {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime?: number;
  spoken_languages: SpokenLanguage[];
  status: Status;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Video[];
};

export type Movie = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: GenreIds;
  original_language: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
};

export type MoviesRes = {
  page: number;
  results: Movies;
  total_pages: number;
  total_results: number;
};

export type Movies = Movie[];
