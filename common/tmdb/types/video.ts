import { VIDEO_TYPE, VIDEO_SOURCE } from "../constants";

export type VideoSource = (typeof VIDEO_SOURCE)[number];

export type VideoType = (typeof VIDEO_TYPE)[number];

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: VideoSource;
  size: number;
  type: VideoType;
  official: false;
  published_at: string;
  id: string;
};

export type VideoRes = {
  id: number;
  results: Video[];
};
