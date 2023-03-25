import { MEDIAS, DETAIL_TYPES, TIME_WINDOW, STATUS } from "../constants";

export type Media = (typeof MEDIAS)[number];

export type DetailType = (typeof DETAIL_TYPES)[number];

export type TimeWindow = (typeof TIME_WINDOW)[number];

export type Status = (typeof STATUS)[number];

export type Page = number | string;

export type Genre = {
  id: number;
  name: string;
};

export type GenreIds = number[];

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

export type Cast = {
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
};

export type Crew = {
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
