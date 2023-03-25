import { axios, tmdbBaseURL } from ".";

import type { Media } from "@/tmdb/types";
import type { VideoRes } from "@/tmdb/types/video";

export const getVideos = async (id: string, mediaType: Media) => {
  const itemType = "videos";
  const reqUrl = `${tmdbBaseURL}/${mediaType}/${id}/${itemType}`;

  const res = await axios(reqUrl).catch(console.error);
  if (!res || !res.data) return;

  const { results } = res.data as VideoRes;

  return results;
};
