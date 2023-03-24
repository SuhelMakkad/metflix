import {
  MEDIAS,
  DETAIL_TYPES,
  MOVIE_TYPES,
  TV_TYPES,
  TIME_WINDOW,
} from "./constants";

export type Media = (typeof MEDIAS)[number];

export type DetailType = (typeof DETAIL_TYPES)[number];

export type MovieType = (typeof MOVIE_TYPES)[number];

export type TVType = (typeof TV_TYPES)[number];

export type TimeWindow = (typeof TIME_WINDOW)[number];

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

export type MoviesRes = {
  page: number;
  results: Movies;
  total_pages: number;
  total_results: number;
};

export type TVShowsRes = {
  page: number;
  results: TVShows;
  total_pages: number;
  total_results: number;
};

export type VideoSource = "YouTube" | "Vimeo";

export type VideoType = "Trailer" | "Clip" | "Featurette";

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: VideoSource;
  size: number;
  type: VideoType;
  official: false;
  published_at: string;
  id: string;
};

export type VideoRes = {
  id: number;
  results: Video[];
};

export type TVShows = TVShow[];

export type Movies = Movie[];
