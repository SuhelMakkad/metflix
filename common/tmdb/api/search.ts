import axios, { GenericAbortSignal } from "axios";

import { APP_BASE_URL } from ".";
import { MultiSearchRes } from "../types/search";
import type { Page } from "../types";

export type Params = {
  query: string;
  page: Page;
  signal?: GenericAbortSignal;
};

export const searchAll = async ({ query, page, signal }: Params) => {
  const reqUrl = `${APP_BASE_URL}/search`;
  const config = {
    signal,
    params: {
      query,
      page,
    },
  };

  const res = await axios.get(reqUrl, config).catch(console.error);
  if (!res || !res.data) return;

  return res.data.result as MultiSearchRes;
};
