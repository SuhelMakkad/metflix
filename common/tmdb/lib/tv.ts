import { axios, getTMDBUrl } from ".";

import type { DetailType, Page, TimeWindow } from "@/tmdb/types";
import type {
  TVShowDetails,
  TVShows,
  TVShowsRes,
  TVType,
} from "@/tmdb/types/tv";

export const getTVShows = async (
  type: TVType | DetailType,
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

export const getTVShowsList = async (
  tvShowsToGet: TVType[] | DetailType[],
  id?: string
) => {
  const tvShows = {} as Record<(typeof tvShowsToGet)[number], TVShows>;

  const tvShowPromises = tvShowsToGet.map((tvShowType) =>
    getTVShows(tvShowType, id)
  );
  const tvShowsRes = await Promise.allSettled(tvShowPromises);
  const tvShowsList = tvShowsRes.map(
    (tvShowRes) =>
      (tvShowRes.status === "fulfilled" && tvShowRes.value?.results) || []
  );

  tvShowsToGet.forEach((movieType, index) => {
    tvShows[movieType] = tvShowsList[index];
  });

  return tvShows;
};
