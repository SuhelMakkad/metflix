import { MEDIAS, DETAIL_TYPES, TIME_WINDOW, STATUS } from "../constants";

export type Media = (typeof MEDIAS)[number];

export type DetailType = (typeof DETAIL_TYPES)[number];

export type TimeWindow = (typeof TIME_WINDOW)[number];

export type Status = (typeof STATUS)[number];

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  iso_639_1: string;
  name: string;
};
