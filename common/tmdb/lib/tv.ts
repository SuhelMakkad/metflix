import type { Page, TimeWindow } from "@/tmdb/types";
import type { TVShowDetails, TVShowsRes, TVType } from "@/tmdb/types/tv";
import { axios, getTMDBUrl } from ".";

export const getTVShows = async (
  type: TVType,
  id?: string,
  timeWindow?: TimeWindow,
  page?: Page
) => {
  const mediaType = "tv";
  const reqUrl = getTMDBUrl(mediaType, id, type, timeWindow);
  const config = {
    params: {
      page,
    },
  };

  const res = await axios(reqUrl, config).catch(console.error);
  if (!res || !res.data) return;

  return res.data as TVShowsRes;
};

export const getTVShow = async (id: string) => {
  const mediaType = "tv";
  const reqUrl = getTMDBUrl(mediaType, id);

  const res = await axios(reqUrl).catch(console.error);
  if (!res || !res.data) return;

  return res.data as TVShowDetails;
};
