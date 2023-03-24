export const TMDB_BASE_URL = "https://api.themoviedb.org/3" as const;

export const MEDIAS = ["movie", "tv"] as const;

export const TIME_WINDOW = ["day", "week"] as const;

export const DETAIL_TYPES = [
  "images",
  "recommendations",
  "similar",
  "videos",
  "credits",
] as const;

export const MOVIE_TYPES = [
  "trending",
  "top_rated",
  "popular",
  "now_playing",
  "upcoming",
] as const;

export const TV_TYPES = [
  "trending",
  "top_rated",
  "popular",
  "airing_today",
  "on_the_air",
] as const;

export const VIDEO_SOURCE = ["YouTube", "Vimeo"] as const;

export const VIDEO_TYPE = ["Trailer", "Clip", "Featurette"] as const;

export const STATUS = [
  "Rumored",
  "Planned",
  "In Production",
  "Post Production",
  "Released",
  "Canceled",
] as const;
