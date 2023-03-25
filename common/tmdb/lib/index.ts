import defaultAxios from "axios";

import { TMDB_BASE_URL } from "../constants";

import type { Credits, DetailType, Media, TimeWindow } from "@/tmdb/types";
import type { MovieType } from "@/tmdb/types/movie";
import type { TVType } from "@/tmdb/types/tv";
import type { VideoSource } from "@/tmdb/types/video";

export const tmdbBaseURL = TMDB_BASE_URL;

export const axios = defaultAxios.create({
  params: {
    api_key: process.env.TMBD_API_KEY,
  },
});

export type ItemType = TVType | MovieType | DetailType;

/**
 * Possible URLs
 * - /trending/movie/day
 * - /trending/tv/day
 *
 * - /movie/latest
 * - /movie/now_playing
 * - /movie/popular
 * - /movie/top_rated
 * - /movie/upcoming
 *
 * - /movie/{movie_id}
 * - /movie/{movie_id}/images
 * - /movie/{movie_id}/recommendations
 * - /movie/{movie_id}/similar
 * - /movie/{movie_id}/videos
 *
 * - /tv/latest
 * - /tv/airing_today
 * - /tv/on_the_air
 * - /tv/popular
 * - /tv/top_rated
 *
 * - /tv/{tv_id}
 * - /tv/{tv_id}/images
 * - /tv/{tv_id}/recommendations
 * - /tv/{tv_id}/similar
 * - /tv/{tv_id}/videos
 */
export const getTMDBUrl = (
  media: Media,
  id?: string,
  itemType?: ItemType,
  timeWindow?: TimeWindow
) => {
  if (itemType === "trending") {
    return timeWindow
      ? `${tmdbBaseURL}/${itemType}/${media}/${timeWindow}`
      : `${tmdbBaseURL}/${itemType}/${media}/day`;
  }

  if (id) {
    return itemType
      ? `${tmdbBaseURL}/${media}/${id}/${itemType}`
      : `${tmdbBaseURL}/${media}/${id}`;
  }

  return `${tmdbBaseURL}/${media}/${itemType}`;
};

export const getCredits = async (id: string, media: Media) => {
  const reqUrl = getTMDBUrl(media, id, "credits");

  const res = await axios(reqUrl).catch(console.error);

  if (!res || !res.data) return;

  return res.data as Credits;
};

export const getVideoUrl = (key: string, site: VideoSource) => {
  if (site === "YouTube") {
    return `https://www.youtube.com/watch?v=${key}`;
  }

  if (site === "Vimeo") {
    return `https://player.vimeo.com/video/${key}`;
  }
};
