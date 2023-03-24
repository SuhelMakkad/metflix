import axios from "axios";

import {
  MoviesRes,
  MovieType,
  TimeWindow,
  TVShowsRes,
  TVType,
  Media,
} from "./types";

export const BASE_URL = "/api/tmdb";

export const getMovies = async (
  type: MovieType,
  id?: string,
  timeWindow?: TimeWindow
) => {
  const mediaType = "movie";
  const reqUrl = `${BASE_URL}/${mediaType}`;
  const config = {
    params: {
      type,
      id,
      timeWindow,
    },
  };
  const res = await axios.get(reqUrl, config).catch(console.error);

  if (!res || !res.data) return;

  return res.data.movies as MoviesRes;
};

export const getTVShows = async (
  type: TVType,
  id?: string,
  timeWindow?: TimeWindow
) => {
  const mediaType = "tv";
  const reqUrl = `${BASE_URL}/${mediaType}`;
  const config = {
    params: {
      type,
      id,
      timeWindow,
    },
  };
  const res = await axios.get(reqUrl, config).catch(console.error);

  if (!res || !res.data) return;

  return res.data.tv as TVShowsRes;
};

export const getVideoUrl = (id: string | number, media: Media) => {
  return `/api/tmdb/${media}/video/${id}`;
};
