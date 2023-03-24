import axios from "axios";

import { APP_BASE_URL } from ".";

import type { TimeWindow } from "../types";
import type { TVShowsRes, TVType } from "../types/tv";

export const getTVShows = async (
  type: TVType,
  id?: string,
  timeWindow?: TimeWindow
) => {
  const mediaType = "tv";
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

  return res.data.tv as TVShowsRes;
};
