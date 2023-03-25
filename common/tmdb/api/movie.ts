import axios from "axios";

import { APP_BASE_URL } from ".";

import type { DetailType, TimeWindow } from "../types";
import type { MoviesRes, MovieType } from "../types/movie";

export type Args = {
  type: MovieType | DetailType;
  id?: string;
  timeWindow?: TimeWindow;
  page?: string | number;
};

export const getMovies = async (data: Args) => {
  const { type, id, page, timeWindow } = data;

  const mediaType = "movie";
  const reqUrl = `${APP_BASE_URL}/${mediaType}`;
  const config = {
    params: {
      type,
      id,
      timeWindow,
      page,
    },
  };

  const res = await axios.get(reqUrl, config).catch(console.error);

  if (!res || !res.data) return;

  return res.data.movies as MoviesRes;
};
