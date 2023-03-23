export const TMDB_BASE_URL = "https://api.themoviedb.org/3" as const;

export const MEDIAS = ["movie", "tv"] as const;

export const TIME_WINDOW = ["day", "week"] as const;

export const DETAIL_TYPES = [
  "images",
  "recommendations",
  "similar",
  "videos",
] as const;

export const MOVIE_TYPES = [
  "trending",
  "discover",
  "latest",
  "top_rated",
  "popular",
  "now_playing",
  "upcoming",
] as const;

export const TV_TYPES = [
  "trending",
  "discover",
  "latest",
  "top_rated",
  "popular",
  "airing_today",
  "on_the_air",
] as const;
