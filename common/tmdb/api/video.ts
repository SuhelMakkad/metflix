import { Media } from "../types";

export const getVideoUrl = (id: string | number, media: Media) => {
  return `/api/tmdb/${media}/video/${id}`;
};
