import { MOVIE_TYPES } from "../constants";

export type MovieType = (typeof MOVIE_TYPES)[number];

export type Movie = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: number[];
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
