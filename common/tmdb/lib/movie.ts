import { axios, getTMDBUrl } from ".";

import type { Page, TimeWindow } from "@/tmdb/types";
import type { MovieDetails, MoviesRes, MovieType } from "@/tmdb/types/movie";

export const getMovies = async (
  type: MovieType,
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
