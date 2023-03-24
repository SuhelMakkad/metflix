import axios from "axios";

import { APP_BASE_URL } from ".";

import type { TimeWindow } from "../types";
import type { MoviesRes, MovieType } from "../types/movie";

export const getMovies = async (
  type: MovieType,
  id?: string,
  timeWindow?: TimeWindow
) => {
  const mediaType = "movie";
  const reqUrl = `${APP_BASE_URL}/${mediaType}`;
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
