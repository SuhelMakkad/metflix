import defaultAxios from "axios";

import {
  DetailType,
  Media,
  MoviesRes,
  MovieType,
  TimeWindow,
  TVShowsRes,
  TVType,
} from "@/api/types";

export const tmdbBaseURL = "https://api.themoviedb.org/3";

const axios = defaultAxios.create({
  baseURL: tmdbBaseURL,
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
  timeWindow?: TimeWindow
) => {
  const mediaType = "movie";
  const reqUrl = getTMDBUrl(mediaType, id, type, timeWindow);

  const res = await axios(reqUrl);
  if (!res || !res.data) return;

  return res.data as MoviesRes;
};

export const getTVShows = async (
  type: TVType,
  id?: string,
  timeWindow?: TimeWindow
) => {
  const mediaType = "tv";
  const reqUrl = getTMDBUrl(mediaType, id, type, timeWindow);

  const res = await axios(reqUrl);
  if (!res || !res.data) return;

  return res.data as TVShowsRes;
};
