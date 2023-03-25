import axios, { GenericAbortSignal } from "axios";

import { APP_BASE_URL } from ".";
import { PersonDetails } from "../types/person";

export type Params = {
  id: string;
  signal?: GenericAbortSignal;
};

export const getPerson = async ({ id, signal }: Params) => {
  const reqUrl = `${APP_BASE_URL}/person`;
  const config = {
    signal,
    params: {
      id,
    },
  };

  const res = await axios.get(reqUrl, config).catch(console.error);
  if (!res || !res.data) return;

  return res.data.person as PersonDetails;
};
