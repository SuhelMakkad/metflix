import defaultAxios from "axios";
import { env } from "process";
import { MoviesRes } from "./types";

export const baseURL = "https://api.themoviedb.org/3";

const axios = defaultAxios.create({
  baseURL,
  params: {
    api_key: env.TMBD_API_KEY,
  },
});

export const getRequestToken = async () => {
  const reqUrl = "/authentication/token/new";

  const res = await axios.get(reqUrl).catch(console.error);

  if (!res || !res.data.success) return;

  const data = res.data;
  const {
    expires_at,
    request_token,
  }: { expires_at: string; request_token: string } = data;

  const tokenData = {
    expiresAt: new Date(expires_at).getTime(),
    token: request_token,
  };

  return tokenData;
};

export const getDiscoverMovies = async () => {
  const reqUrl = "/discover/movie";

  const sortBy = "popularity.desc";
  const config = {
    params: {
      sort_by: sortBy,
    },
  };

  const res = await axios.get(reqUrl, config).catch(console.error);

  if (!res || !res.data) return;

  return res.data as MoviesRes;
};

export const getTrendingMovies = async () => {
  const reqUrl = "/trending/movie/day";

  const res = await axios.get(reqUrl).catch(console.error);

  if (!res || !res.data) return;

  return res.data as MoviesRes;
};
