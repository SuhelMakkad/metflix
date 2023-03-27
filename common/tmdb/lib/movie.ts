import { axios, getTMDBUrl } from ".";

import type { DetailType, Page, TimeWindow } from "@/tmdb/types";
import type {
  MovieDetails,
  Movies,
  MoviesRes,
  MovieType,
} from "@/tmdb/types/movie";

export const getMovies = async (
  type: MovieType | DetailType,
  id?: string,
  timeWindow?: TimeWindow,
  page?: Page
) => {
  const mediaType = "movie";
  const reqUrl = getTMDBUrl(mediaType, id, type, timeWindow);
  const config = {
    params: {
      page,
    },
  };

  const res = await axios(reqUrl, config).catch(console.error);
  if (!res || !res.data) return;

  return res.data as MoviesRes;
};

export const getMovie = async (id: string) => {
  const mediaType = "movie";
  const reqUrl = getTMDBUrl(mediaType, id);

  const res = await axios(reqUrl).catch(console.error);
  if (!res || !res.data) return;

  return res.data as MovieDetails;
};

export const getMoviesList = async (
  moviesToGet: MovieType[] | DetailType[],
  id?: string
) => {
  const movies = {} as Record<(typeof moviesToGet)[number], Movies>;

  const moviePromises = moviesToGet.map((movieType) =>
    getMovies(movieType, id)
  );
  const moviesRes = await Promise.allSettled(moviePromises);
  const moviesList = moviesRes.map(
    (movieRes) =>
      (movieRes.status === "fulfilled" && movieRes.value?.results) || []
  );

  moviesToGet.forEach((movieType, index) => {
    movies[movieType] = moviesList[index];
  });

  return movies;
};
