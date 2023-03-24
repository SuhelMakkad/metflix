import defaultAxios from "axios";

import type { DetailType, Media, TimeWindow } from "@/tmdb/types";
import type { MoviesRes, MovieType } from "@/tmdb/types/movie";
import type { TVShowsRes, TVType } from "@/tmdb/types/tv";
import type { VideoRes, VideoSource } from "@/tmdb/types/video";

export const tmdbBaseURL = "https://api.themoviedb.org/3";

const axios = defaultAxios.create({
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

export const getMovies = async (
  type: MovieType,
  id?: string,
  timeWindow?: TimeWindow,
  page?: string | number
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

export const getTVShows = async (
  type: TVType,
  id?: string,
  timeWindow?: TimeWindow,
  page?: string | number
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

export const getVideoUrl = (key: string, site: VideoSource) => {
  if (site === "YouTube") {
    return `https://www.youtube.com/watch?v=${key}`;
  }

  if (site === "Vimeo") {
    return `https://player.vimeo.com/video/${key}`;
  }
};

export const getVideos = async (id: string, mediaType: Media) => {
  const itemType = "videos";
  const reqUrl = `${tmdbBaseURL}/${mediaType}/${id}/${itemType}`;

  const res = await axios(reqUrl).catch(console.error);

  if (!res || !res.data) return;

  const { results } = res.data as VideoRes;

  return results;
};
