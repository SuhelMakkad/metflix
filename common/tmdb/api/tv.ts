import axios from "axios";

import { APP_BASE_URL } from ".";

import type { DetailType, TimeWindow } from "../types";
import type { TVShowsRes, TVType } from "../types/tv";

export type Args = {
  type: TVType | DetailType;
  id?: string;
  timeWindow?: TimeWindow;
  page?: string | number;
};

export const getTVShows = async (data: Args) => {
  const { type, id, page, timeWindow } = data;

  const mediaType = "tv";
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

  return res.data.tv as TVShowsRes;
};
