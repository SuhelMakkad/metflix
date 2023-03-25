import { axios, tmdbBaseURL } from ".";

import type { Page } from "@/tmdb/types";
import type { MultiSearchRes } from "@/tmdb/types/search";

export const searchAll = async (query: string, page?: Page) => {
  const reqUrl = `${tmdbBaseURL}/search/multi`;
  const config = {
    params: {
      query,
      page,
    },
  };

  const res = await axios(reqUrl, config).catch(console.error);
  if (!res || !res.data) return;

  return res.data as MultiSearchRes;
};
