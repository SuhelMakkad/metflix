import { NextResponse } from "next/server";

import { getMovies, getTVShows } from "@/lib/tmdb";

import { MOVIE_TYPES, TIME_WINDOW, TV_TYPES } from "@/tmdb/constants";

import type { Media, TimeWindow } from "@/tmdb/types";
import type { MovieType } from "@/tmdb/types/movie";
import type { TVType } from "@/tmdb/types/tv";

export type Params = {
  media: Media;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { media } = params;

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id") ?? undefined;
  const type = searchParams.get("type") as MovieType | TVType;
  const timeWindow = searchParams.get("timeWindow") as TimeWindow;

  if (timeWindow && !TIME_WINDOW.includes(timeWindow)) {
    return new Response("invalid time window", {
      status: 400,
    });
  }

  if (media === "movie") {
    if (!MOVIE_TYPES.includes(type as MovieType)) {
      return new Response("invalid movie type", {
        status: 400,
      });
    }

    const movies = await getMovies(type as MovieType, id, timeWindow);
    return NextResponse.json({ movies });
  }

  if (media === "tv") {
    if (!TV_TYPES.includes(type as TVType)) {
      return new Response("invalid tv type", {
        status: 400,
      });
    }

    const tv = await getTVShows(type as TVType, id, timeWindow);
    return NextResponse.json({ tv });
  }
}
