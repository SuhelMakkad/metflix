import { axios, tmdbBaseURL } from ".";

import type {
  PersonCastRes,
  PersonDetails,
  PersonImageRes,
} from "@/tmdb/types/person";

export const getPerson = async (id: string) => {
  const reqUrl = `${tmdbBaseURL}/person/${id}`;

  console.log({ reqUrl });

  const res = await axios(reqUrl).catch(console.error);
  if (!res || !res.data) return;

  return res.data as PersonDetails;
};

export const getPersonCredits = async (id: string) => {
  const reqUrl = `${tmdbBaseURL}/person/${id}/combined_credits`;

  console.log({ reqUrl });

  const res = await axios(reqUrl).catch(console.error);
  if (!res || !res.data) return;

  return res.data as PersonCastRes;
};

export const getPersonImages = async (id: string) => {
  const reqUrl = `${tmdbBaseURL}/person/${id}/images`;

  console.log({ reqUrl });

  const res = await axios(reqUrl).catch(console.error);
  if (!res || !res.data) return;

  return res.data as PersonImageRes;
};
